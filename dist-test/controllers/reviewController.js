"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contract = _interopRequireDefault(require("../models/contract"));

var _review = _interopRequireDefault(require("../models/review"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getAllReviews = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var reviews = yield _review.default.find({});
      res.status(200).send({
        success: 'true',
        length: reviews.length,
        data: {
          reviews
        }
      });
    } catch (err) {
      res.status(404).send({
        success: false
      });
    }
  });

  return function getAllReviews(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getReviewsFromUserByID = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      /*  const user = await User.findOneById(req.params.id);
          -- Get all reviews where employee in Contract equals :userID
          -- populate from review to contract in which employee equals :userID
      */
    } catch (err) {}
  });

  return function getReviewsFromUserByID(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/*  
/api/reviews/:contractID
Only possible if the status of the contract the review references equals 'accepted' and
the user making the review is the employer as in the contract
*/


var createReview = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var contract = yield _contract.default.findById({
        _id: req.params.contractID
      });

      if (!contract) {
        throw new Error('Contract does not exists');
      }

      if (contract.employer.toString() !== req.user._id.toString()) {
        throw new Error('Only the employer can make a review');
      }

      if (contract.status !== 'accepted') {
        throw new Error('The contract need to be accepted in order to review it');
      }

      if (contract.has_review) {
        throw new Error('You have already reviewed this contract');
      }

      var newReview = new _review.default(_objectSpread(_objectSpread({}, req.body), {}, {
        contract: req.params.contractID
      }));
      yield newReview.save();
      contract.has_review = true;
      yield contract.save();
      res.status(200).send({
        success: true,
        data: {
          newReview
        }
      });
    } catch (err) {
      res.status(400).send({
        success: false,
        error: err.message
      });
    }
  });

  return function createReview(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = {
  getAllReviews,
  createReview,
  getReviewsFromUserByID
};
exports.default = _default;