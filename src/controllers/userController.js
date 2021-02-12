import User from '../models/user';

//GET  /api/users?email=EMPLEADO_1&trade=gasista&skip=1&limit=7
const getAllUsers = async (req, res) => {
  try {
    const emailFilter = req.query.email ? req.query.email : '';

    let users;

    if (req.query.trade) {
      users = await User.find({
        email: { $ne: emailFilter },
        'trades.trade': req.query.trade,
      })
        .limit(parseInt(req.query.limit))
        .skip(parseInt(req.query.skip));
    } else {
      users = await User.find({
        email: { $ne: emailFilter },
      })
        .limit(parseInt(req.query.limit))
        .skip(parseInt(req.query.skip));
    }
    
    res.header('Access-Control-Expose-Headers', 'X-Total-Count')
    res.set('X-Total-Count', users.length)
    res.status(200).send({
     
      success: 'true',
     
      data: users,
      total: users.length,
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


const adminUpdateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'trades'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const user = await User.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

export default { getAllUsers, signIn, signUp, readProfile, logout, adminUpdateUser };
