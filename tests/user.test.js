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
      password: 'signup-test',
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

let contractID;

test('Should create a contract between users (employee)[0] and (employer)[2]', async () => {
  const response = await request(app)
    .post('/api/contracts')
    .send({
      employee: usersData[0]._id,
      employer: usersData[2]._id,
      trade: 'gasista',
    })
    .expect(200);
  contractID = response.body.data.newContract._id;
});

test('Should mark contract between users [0] and [2] as accepted', async () => {
  await request(app)
    .patch(`/api/contracts/${contractID}`)
    .set('Authorization', `Bearer ${usersData[0].tokens[0].token}`)
    .expect(200);
});

test('Should signin an existing user', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: usersData[4].email,
      password: usersData[4].password,
    })
    .expect(200);
});

let contractID42;

test('Should create a contract between users (employee)[4] and (employer)[2]', async () => {
  const response = await request(app)
    .post('/api/contracts')
    .send({
      employee: usersData[4]._id,
      employer: usersData[2]._id,
      trade: 'plomero',
    })
    .expect(200);
  contractID42 = response.body.data.newContract._id;
});

test('Should mark contract between users [4] and [2] as accepted', async () => {
  await request(app)
    .patch(`/api/contracts/${contractID42}`)
    .set('Authorization', `Bearer ${usersData[4].tokens[0].token}`)
    .expect(200);
});

test('Should create a review associated to the contract between users [4] and [2]', async () => {
  await request(app)
    .post(`/api/contracts/${contractID42}/reviews`)
    .set('Authorization', `Bearer ${usersData[2].tokens[0].token}`)
    .send({
      title: 'Recomendado',
      description: 'Realizo un excelente trabajo, lo recomiendo.',
      rating: 5,
    })
    .expect(200);
});

let contractID04;

test('Should create a contract between users (employee)[0] and (employer)[4]', async () => {
  const response = await request(app)
    .post('/api/contracts')
    .send({
      employee: usersData[0]._id,
      employer: usersData[4]._id,
      trade: 'gasista',
    })
    .expect(200);
  contractID04 = response.body.data.newContract._id;
});

test('Should mark contract between users [0] and [4] as accepted', async () => {
  await request(app)
    .patch(`/api/contracts/${contractID04}`)
    .set('Authorization', `Bearer ${usersData[0].tokens[0].token}`)
    .expect(200);
});

/*test('Should create a review associated to the contract between users [0] and [2]', async () => {
  await request(app)
    .post(`/api/reviews/${contractID}`)
    .set('Authorization', `Bearer ${usersData[2].tokens[0].token}`)
    .send({
      title: 'xd',
      description: 'Best gasista in the world!!',
      rating: 4,
    })
    .expect(200);
});
*/

test('Should create a review associated to the contract between users [0] and [2]', async () => {
  await request(app)
    .post(`/api/contracts/${contractID}/reviews`)
    .set('Authorization', `Bearer ${usersData[2].tokens[0].token}`)
    .send({
      title: 'xd',
      description: 'Best gasista in the worldsadasd!!',
      rating: 4,
    })
    .expect(200);
});

test('Should create a review associated to the contract between users [0] and [4]', async () => {
  await request(app)
    .post(`/api/contracts/${contractID04}/reviews`)
    .set('Authorization', `Bearer ${usersData[4].tokens[0].token}`)
    .send({
      title: 'Normal',
      description: 'Sin destacarse',
      rating: 1,
    })
    .expect(200);
});

test('Should not create a review associated to the contract between users [0] and [2] because there is already one', async () => {
  await request(app)
    .post(`/api/contracts/${contractID}/reviews`)
    .set('Authorization', `Bearer ${usersData[2].tokens[0].token}`)
    .send({
      title: 'xd',
      description: 'Best gasista in the world!!',
      rating: 4,
    })
    .expect(400);
});
