import request from 'supertest';
import app from '../src/app';

test('Should signup a new user', async () => {
  await request(app)
    .post('/api/users')
    .send({
      email: 'chau@test',
      password: 'lpm',
    })
    .expect(201);
});
