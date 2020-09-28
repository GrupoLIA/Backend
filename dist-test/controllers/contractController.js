"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contract = _interopRequireDefault(require("../models/contract"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getAllContracts = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var contracts = yield _contract.default.find({});
      res.status(200).send({
        success: 'true',
        length: contracts.length,
        data: {
          contracts
        }
      });
    } catch (err) {
      res.status(404).send({
        success: false
      });
    }
  });

  return function getAllContracts(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // To be done by the employer


var createContract = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var newContract = yield _contract.default.create(req.body);
      res.status(200).send({
        success: true,
        data: {
          newContract
        }
      });
    } catch (err) {
      res.status(501).send({
        success: false,
        error: err
      });
    }
  });

  return function createContract(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // This can only be done by the employee


var acceptContract = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var contract = yield _contract.default.findById({
        _id: req.params.contractID
      });

      if (contract.employee.toString() !== req.user._id.toString()) {
        throw new Error('Only the employee can accept a contract');
      }

      contract.status = 'accepted';
      yield contract.save();
      res.send({
        success: true
      });
    } catch (err) {
      res.status(400).send({
        success: false,
        error: err.message
      });
    }
  });

  return function acceptContract(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = {
  getAllContracts,
  createContract,
  acceptContract
};
exports.default = _default;