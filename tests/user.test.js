import request from 'supertest';
import app from '../src/app';
import Contract from '../src/models/contract';
import User from '../src/models/user';
import Review from '../src/models/review';
import usersData from './usersTestData';
import MOCK_DATA from './MOCK_DATA';

beforeAll(async () => {
  await User.deleteMany();
  await Contract.deleteMany();
  await Review.deleteMany();
  usersData.forEach(async (user) => {
    await new User(user).save();
  });
});

afterAll(async () => {
  MOCK_DATA.forEach(async (user) => {
    await new User(user).save();
  });
});

test('Should signup a new user', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'signup@test.com',
      password: 'test',
    })
    .expect(201);
});

test('Should signin an existing user', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: usersData[0].email,
      password: usersData[0].password,
    })
    .expect(200);
});

test('Should not signin a non existing user', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'bad-email',
    })
    .expect(400);
});

test('Should not retrieve users if not logged in', async () => {
  await request(app).get('/api/users').expect(401);
});

let contractID40;

test('Should create a contract between users (employee)[0] and (employer)[4]', async () => {
  const response = await request(app)
    .post('/api/contracts')
    .set('Authorization', `Bearer ${usersData[4].tokens[0].token}`)
    .send({
      employee: usersData[0]._id,
      description: 'Limpiar cañerias',
      trade: 'plomero',
    })
    .expect(200);
  contractID40 = response.body.data.newContract._id;
});

test('Should mark contract between users [0] and [4] as accepted', async () => {
  await request(app)
    .patch(`/api/contracts/${contractID40}`)
    .set('Authorization', `Bearer ${usersData[0].tokens[0].token}`)
    .expect(200);
});

let contractID41;

test('Should create a contract between users (employee)[4] and (employer)[1]', async () => {
  const response = await request(app)
    .post('/api/contracts')
    .set('Authorization', `Bearer ${usersData[1].tokens[0].token}`)
    .send({
      employee: usersData[0]._id,
      description: 'Arreglo doméstico',
      trade: 'plomero',
    })
    .expect(200);
  contractID41 = response.body.data.newContract._id;
});

test('Should mark contract between users [4] and [0] as accepted', async () => {
  await request(app)
    .patch(`/api/contracts/${contractID40}`)
    .set('Authorization', `Bearer ${usersData[0].tokens[0].token}`)
    .expect(200);
});

test('Should not create a review associated to the unfinished contract between users [4] and [0]', async () => {
  await request(app)
    .post(`/api/reviews/${contractID40}`)
    .set('Authorization', `Bearer ${usersData[4].tokens[0].token}`)
    .send({
      title: 'Recomendado',
      description: 'Realizo un excelente trabajo, lo recomiendo.',
      rating: 5,
    })
    .expect(400);
});
