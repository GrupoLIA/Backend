"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _reviewController = _interopRequireDefault(require("../controllers/reviewController"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();
router.route('/').get(_reviewController.default.getAllReviews); //router.route('/:').get(auth, reviewController.);

var _default = router;
exports.default = _default;