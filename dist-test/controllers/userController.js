"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getAllUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var users = yield _user.default.find({});
      res.status(200).send({
        success: 'true',
        length: users.length,
        data: {
          users
        }
      });
    } catch (err) {
      res.status(404).send({
        success: false
      });
    }
  });

  return function getAllUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var signUp = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var user = new _user.default(req.body);
      yield user.save();
      var token = yield user.generateAuthToken();
      res.status(201).send({
        success: true,
        data: {
          user,
          token
        }
      });
    } catch (err) {
      res.status(400).send({
        success: false,
        error: err
      });
    }
  });

  return function signUp(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var signIn = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var user = yield _user.default.findByCredentials(req.body.email, req.body.password);
      var token = yield user.generateAuthToken();
      res.send({
        success: true,
        data: {
          user,
          token
        }
      });
    } catch (err) {
      res.status(400).send();
    }
  });

  return function signIn(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = {
  getAllUsers,
  signIn,
  signUp
};
exports.default = _default;