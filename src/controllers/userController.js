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

const signUp = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();

    res.status(201).send({ success: true, data: { user, token } });
  } catch (err) {
    res.status(400).send({ success: false, error: err });
  }
};

const signIn = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ success: true, data: { user, token } });
  } catch (err) {
    res.status(400).send();
  }
};

const readProfile = async (req, res) => {
  try {
    const user = req.user;
    res.send({ success: true, data: { user } });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const logout = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

export default { getAllUsers, signIn, signUp, readProfile, logout };
