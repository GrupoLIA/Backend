import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, 'A valid email must be specified.'],
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    location: {
      type: String,
    },
    telephones: {
      type: [
        {
          type: String,
        },
      ],
      validate: [verifyTelephonesCount, '{PATH} exceeds the limit of 3'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    profile_description: {
      type: String,
    },
    trades: [
      {
        trade: { type: String },
        validation_date: { type: Date, default: Date.now },
        expiracy_date: { type: Date },
        total_rating: { type: Number, default: 0 },
        review_count: { type: Number, default: 0 },
      },
    ],
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

function verifyTelephonesCount(val) {
  return val.length <= 3;
}

// Hide sensitive information in JSON responses.
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.__v;

  return userObject;
};

userSchema.methods.hasTradeExpired = function (trade) {
  const user = this;
  const tradeIndex = user.trades.findIndex((t) => t.trade == trade);

  if (
    new Date(user.trades[tradeIndex].expiracy_date).toISOString() >
    new Date().toISOString()
  ) {
    return false;
  }

  return true;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const secretKey = process.env.SECRETKEY || 'hola';
  const token = jwt.sign({ _id: user._id.toString() }, secretKey);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

// Hash the plain text password before saving.
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Duplicate the ID field.
userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

const User = mongoose.model('User', userSchema);

export default User;
