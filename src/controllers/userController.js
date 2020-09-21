import User from '../models/user';

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).send({
      success: 'true',
      length: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).send({ success: false });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.status(200).send({ success: true, data: { newUser } });
  } catch (err) {
    res.status(501).send({ success: false, error: err });
  }
};

export default { getAllUsers, createUser };
