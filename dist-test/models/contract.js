"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contractSchema = _mongoose.default.Schema({
  employer: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A contract must belong to a user.']
  },
  employee: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A contract must be directed to a user.']
  },
  status: {
    type: String,
    enum: ['pending', 'expired', 'accepted'],
    default: 'pending'
  },
  has_review: {
    type: Boolean,
    default: false
  },
  trade: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var Contract = _mongoose.default.model('Contract', contractSchema);

var _default = Contract;
exports.default = _default;