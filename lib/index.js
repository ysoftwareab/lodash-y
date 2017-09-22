'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._ = exports.mixins = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _abstract = require('./abstract');

var _abstract2 = _interopRequireDefault(_abstract);

var _deeply = require('./deeply');

var _deeply2 = _interopRequireDefault(_deeply);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let mixins = exports.mixins = {
  abstract: _abstract2.default,
  deeply: _deeply2.default
};

let _ = exports._ = _lodash2.default.runInContext();
_.mixin(mixins);

exports.default = _;

//# sourceMappingURL=index.js.map