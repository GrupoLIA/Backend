import './db/mongoose';

import express from 'express';
import cors from 'cors';

import reviewRoute from './routes/reviewRoute';
import userRoute from './routes/userRoute';
import contractRoute from './routes/contractRoute';
import adminRoute from './routes/adminRoute'

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/reviews', reviewRoute);
app.use('/api/users', userRoute);
app.use('/api/contracts', contractRoute);
app.use('/api/admin', adminRoute);


export default app;
