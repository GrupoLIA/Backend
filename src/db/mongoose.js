import mongoose from 'mongoose';

const db = process.env.DB || 'mongodb://127.0.0.1:27017/LIA-BACKEND';

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
