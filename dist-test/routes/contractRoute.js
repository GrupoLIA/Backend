"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var _contractController = _interopRequireDefault(require("../controllers/contractController"));

var _reviewController = _interopRequireDefault(require("../controllers/reviewController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();
router.route('/').get(_contractController.default.getAllContracts).post(_contractController.default.createContract);
router.route('/:contractID').patch(_auth.default, _contractController.default.acceptContract);
router.route('/:contractID/reviews').post(_auth.default, _reviewController.default.createReview);
var _default = router;
exports.default = _default;