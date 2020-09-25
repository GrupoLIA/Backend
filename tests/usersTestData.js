import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId(),
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
  },

  {
    _id: new mongoose.Types.ObjectId(),
    email: 'EMPLEADO_2',
    password: 'EMPLEADO_2',
  },

  {
    _id: new mongoose.Types.ObjectId(),
    email: 'USER_1',
    password: 'USER_1',
  },

  {
    _id: new mongoose.Types.ObjectId(),
    email: 'USER_2',
    password: 'USER_2',
  },
];
