import request from 'supertest';
import app from '../src/app';
import Contract from '../src/models/contract';
import User from '../src/models/user';
import usersData from './usersTestData';

beforeAll(async () => {
  await User.deleteMany();
  await Contract.deleteMany();
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

test('Should create a contract between users (employee)[0] and (employer)[2]', async () => {
  const data = await request(app)
    .post('/api/contracts')
    .send({
      employee: usersData[0]._id,
      employer: usersData[2]._id,
      trade: 'gasista',
    })
    .expect(200);
  console.log(data.req.res.client.res);
});

/*


test('Should mark contract between users [0] and [2] as accepted', async () => {
  await request(app).post(`/api/contracts/${}`).expect(400);
});
*/

/*test('Should create a review associated to the contract between users [0] and [2]', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'bad-email',
    })
    .expect(400);
});*/
