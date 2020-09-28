"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./db/mongoose");

var _express = _interopRequireDefault(require("express"));

var _reviewRoute = _interopRequireDefault(require("./routes/reviewRoute"));

var _userRoute = _interopRequireDefault(require("./routes/userRoute"));

var _contractRoute = _interopRequireDefault(require("./routes/contractRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.use(_express.default.json());
app.use('/api/reviews', _reviewRoute.default);
app.use('/api/users', _userRoute.default);
app.use('/api/contracts', _contractRoute.default);
var _default = app;
exports.default = _default;