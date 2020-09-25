import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const user1ID = new mongoose.Types.ObjectId();
const user1 = {
  _id: user1ID,
  email: 'EMPLEADO_1',
  password: 'EMPLEADO_1',
  telephones: ['2995244782', '29425263879', '29425263879'],
  trades: [
    {
      trade: 'gasista',
      validation_date: Date.now(),
      expiracy_date: Date.now(),
      total_rating: 1,
      review_count: 1,
    },
  ],
  tokens: [
    {
      token: jwt.sign({ _id: user1ID }, 'hola'),
    },
  ],
};

const user2ID = new mongoose.Types.ObjectId();
const user2 = {
  _id: user2ID,
  email: 'EMPLEADO_2',
  password: 'EMPLEADO_2',
  tokens: [
    {
      token: jwt.sign({ _id: user2ID }, 'hola'),
    },
  ],
};

const user3ID = new mongoose.Types.ObjectId();
const user3 = {
  _id: user3ID,
  email: 'USER_1',
  password: 'USER_1',
  tokens: [
    {
      token: jwt.sign({ _id: user3ID }, 'hola'),
    },
  ],
};

const user4ID = new mongoose.Types.ObjectId();
const user4 = {
  _id: user4ID,
  email: 'USER_2',
  password: 'USER_2',
  tokens: [
    {
      token: jwt.sign({ _id: user4ID }, 'hola'),
    },
  ],
};

export default [user1, user2, user3, user4];
