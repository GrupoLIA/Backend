"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var userSchema = _mongoose.default.Schema({
  /*name:{
        },*/
  email: {
    type: String,
    unique: true,
    required: [true, 'A valid email must be specified.']
  },
  password: {
    type: String,
    required: true
  },
  img_source: {
    type: String
  },
  location: {
    type: String
  },
  telephones: {
    type: [{
      type: String
    }],
    validate: [verifyTelephonesCount, '{PATH} exceeds the limit of 3']
  },
  profile_description: {
    type: String
  },
  trades: [{
    trade: {
      type: String
    },
    validation_date: {
      type: Date,
      default: Date.now
    },
    expiracy_date: {
      type: Date
    },
    total_rating: {
      type: Number,
      default: 0
    },
    review_count: {
      type: Number,
      default: 0
    }
  }],
  favorites: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: User
  }],
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

function verifyTelephonesCount(val) {
  return val.length <= 3;
}

userSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.methods.generateAuthToken = /*#__PURE__*/_asyncToGenerator(function* () {
  var user = this;

  var token = _jsonwebtoken.default.sign({
    _id: user._id.toString()
  }, 'hola');

  user.tokens = user.tokens.concat({
    token
  });
  yield user.save();
  return token;
});

userSchema.statics.findByCredentials = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (email, password) {
    var user = yield User.findOne({
      email
    });

    if (!user) {
      throw new Error('Unable to login');
    }

    var isMatch = yield _bcrypt.default.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Unable to login');
    }

    return user;
  });

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}(); // Hash the plain text password before saving


userSchema.pre('save', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (next) {
    var user = this;

    if (user.isModified('password')) {
      user.password = yield _bcrypt.default.hash(user.password, 8);
    }

    next();
  });

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());

var User = _mongoose.default.model('User', userSchema);

var _default = User;
exports.default = _default;