import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const user1ID = new mongoose.Types.ObjectId();
const user1 = {
  _id: user1ID,
  email: 'EMPLEADO_1',
  password: 'EMPLEADO_1',
  telephones: ['2995244782', '29425263879', '29425263879'],
  profile_description:
    'Hola mi nombre es EMPLEADO_1 y soy gasista hace más de 30 años.',
  img_source:
    'https://spoiler.bolavip.com/__export/1573585573064/sites/bolavip/img/2019/11/12/henry_cavill_argentina_comic_con_superman_crop1573585468551.jpg_1902800913.jpg',
  trades: [
    {
      trade: 'gasista',
      validation_date: Date.now(),
      expiracy_date: Date.now(),
      total_rating: 1,
      review_count: 1,
    },

    {
      trade: 'plomero',
      validation_date: Date.now(),
      expiracy_date: Date.now(),
      total_rating: 5,
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

const user5ID = new mongoose.Types.ObjectId();
const user5 = {
  _id: user5ID,
  email: 'EMPLEADO_3',
  password: 'EMPLEADO_3',
  telephones: ['2995175320'],
  profile_description: 'Hola mi nombre es EMPLEADO_3 y soy plomero.',
  img_source:
    'https://spoiler.bolavip.com/__export/1573585573064/sites/bolavip/img/2019/11/12/henry_cavill_argentina_comic_con_superman_crop1573585468551.jpg_1902800913.jpg',
  trades: [
    {
      trade: 'plomero',
      validation_date: Date.now(),
      expiracy_date: Date.now(),
      total_rating: 1,
      review_count: 1,
    },
  ],
  tokens: [
    {
      token: jwt.sign({ _id: user5ID }, 'hola'),
    },
  ],
};

export default [user1, user2, user3, user4, user5];
