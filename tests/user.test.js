import request from 'supertest';
import app from '../src/app';
import User from '../src/models/user';
import usersData from './usersTestData';

beforeAll(async () => {
  await User.deleteMany();
  usersData.forEach(async (user) => {
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
