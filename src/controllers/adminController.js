import { isValidObjectId } from 'mongoose';
import User from '../models/user';

const getUser = async (req, res) => {
  const user_id = req.params.id;

  if (!isValidObjectId(user_id)) {
    return res.status(404).send({
      error: {
        code: 100,
        message: 'Incorrect user id',
        description: `The parameter's id ${user_id} is not well-formed.`,
      },
    });
  }

  try {
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).send({
        error: {
          code: 101,
          message: 'User not found',
          description: 'The user was not found in the database.',
        },
      });
    }

    res.send(user);
  } catch (error) {
    res.status(500).send({
      error: {
        message: 'Internal server error',
      },
    });
  }
};

const addTrade = async (req, res) => {
  const user_id = req.params.id;

  if (!isValidObjectId(user_id)) {
    return res.status(404).send({
      error: {
        code: 100,
        message: 'Incorrect user id',
        description: `The parameter's id ${user_id} is not well-formed.`,
      },
    });
  }
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      user_id,
      {
        $push: {
          trades: {
            total_rating: 0,
            review_count: 0,
            trade: data.trade,
            validation_date: new Date(),
            expiracy_date: data.expiracy_date,
          },
        },
      },
      {
        new: true,
      }
    );

    if (!user) {
      return res.status(404).send({
        error: {
          code: 101,
          message: 'User not found',
          description: 'The user was not found in the database.',
        },
      });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({
      error: {
        message: 'Internal server error',
      },
    });
  }
};

const updateUser = async (req, res) => {
  const user_id = req.params.id;

  if (!isValidObjectId(user_id)) {
    return res.status(404).send({
      error: {
        code: 100,
        message: 'Incorrect user id',
        description: `The parameter's id ${user_id} is not well-formed.`,
      },
    });
  }
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate(user_id, data, {
      new: true,
    });

    if (!user) {
      return res.status(404).send({
        error: {
          code: 101,
          message: 'User not found',
          description: 'The user was not found in the database.',
        },
      });
    }

    res.send(user);
  } catch (error) {
    res.status(500).send({
      error: {
        message: 'Internal server error',
      },
    });
  }
};

const login = async (req, res) => {
  const data = req.body;

  if (!data) {
    return res.status(404).send({
      error: {
        code: 102,
        message: 'Wrong input',
        description: 'Must provide user email and password.',
      },
    });
  }

  try {
    const user = await User.findByCredentials(data.email, data.password);

    if (!user) {
      return res.status(404).send({
        error: {
          code: 101,
          message: 'User not found',
          description: 'The user was not found in the database.',
        },
      });
    }

    if (user.role !== 'admin') {
      // The server generating a 401 response MUST send a WWW-Authenticate header field. See RFC7235 - Sec 4.1
      res.set('WWW-Authenticate', 'Bearer');

      res.status(401).send({
        error: {
          code: 103,
          message: 'Forbidden access',
          description: 'You must be admin to enter',
        },
      });
    }

    const token = await user.generateAuthToken();
    res.send({ ...user, token });
  } catch (err) {
    res.status(500).send({
      error: {
        message: 'Internal server error',
      },
    });
  }
};

export default {
  getUser,
  updateUser,
  addTrade,
  login,
};
