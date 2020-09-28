"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _userController = _interopRequireDefault(require("../controllers/userController"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();
router.route('/').get(_userController.default.getAllUsers);
router.route('/signin').post(_userController.default.signIn);
router.route('/signup').post(_userController.default.signUp);
var _default = router;
exports.default = _default;