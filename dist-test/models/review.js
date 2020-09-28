"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reviewSchema = new _mongoose.default.Schema({
  contract: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Contract',
    required: [true, 'A review must belong to a contract.']
  },
  title: {
    type: String,
    required: [true, 'A title is required.']
  },
  description: {
    type: String,
    required: [true, 'A review is needed.']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'A value between 1 and 5 must be supplied.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

reviewSchema.methods.toJSON = function () {
  var review = this;
  var reviewObject = review.toObject();
  delete reviewObject._id;
  return reviewObject;
};
/*reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: 'reviewer', select: '-__v -password -_id' });
  next();
});*/


var Review = _mongoose.default.model('Review', reviewSchema);

var _default = Review;
exports.default = _default;