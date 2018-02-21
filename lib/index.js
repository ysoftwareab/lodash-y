'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._ = exports.mixins = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _abstract = require('./abstract');

var _abstract2 = _interopRequireDefault(_abstract);

var _base = require('./base64');

var _base2 = _interopRequireDefault(_base);

var _consoleLogTime = require('./console-log-time');

var _consoleLogTime2 = _interopRequireDefault(_consoleLogTime);

var _deeply = require('./deeply');

var _deeply2 = _interopRequireDefault(_deeply);

var _onceIn = require('./once-in');

var _onceIn2 = _interopRequireDefault(_onceIn);

var _promisify = require('./promisify');

var _promisify2 = _interopRequireDefault(_promisify);

var _unbase = require('./unbase64');

var _unbase2 = _interopRequireDefault(_unbase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let mixins = exports.mixins = {
  abstract: _abstract2.default,
  base64: _base2.default,
  consoleLogTime: _consoleLogTime2.default,
  deeply: _deeply2.default,
  onceIn: _onceIn2.default,
  promisify: _promisify2.default,
  unbase64: _unbase2.default
};

let _ = exports._ = _lodash2.default.runInContext();
_.mixin(mixins);

exports.default = _;

//# sourceMappingURL=index.js.map