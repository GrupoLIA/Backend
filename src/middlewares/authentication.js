import jwt from 'jsonwebtoken';
import User from '../models/user';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const secretKey = process.env.SECRETKEY || 'insecure_key';
    const decoded = jwt.verify(token, secretKey);

    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.set('WWW-Authenticate', 'Bearer');
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

export default auth;
