import './db/mongoose';

import express from 'express';

import reviewRoute from './routes/reviewRoute';
import userRoute from './routes/userRoute';

const app = express();

app.use(express.json());
app.use('/api/reviews', reviewRoute);
app.use('/api/users', userRoute);

app.listen(3000, () => console.log('Server is up and running!'));
