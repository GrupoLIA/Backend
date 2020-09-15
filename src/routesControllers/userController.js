import User from '../models/user';

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).send({
      success: 'true',
      length: user.length,
      data: {
        user,
      },
    });
  } catch (e) {
    res.status(404).send({ success: false });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).send({ success: true, data: { user } });
  } catch (e) {
    res.status(501).send({ success: false, error: e });
  }
};

export default { getAllUsers, createUser };
