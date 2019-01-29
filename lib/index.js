"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports._ = exports.mixins = void 0;var _lodash = _interopRequireDefault(require("lodash"));
var _abstract = _interopRequireDefault(require("./abstract"));
var _alwaysPromise = _interopRequireDefault(require("./always-promise"));
var _base = _interopRequireDefault(require("./base64"));
var _consoleLogTime = _interopRequireDefault(require("./console-log-time"));
var _mapValuesDeep = _interopRequireDefault(require("./map-values-deep"));
var _naiveChecksum = _interopRequireDefault(require("./naive-checksum"));
var _onceIn = _interopRequireDefault(require("./once-in"));
var _outdent = _interopRequireDefault(require("outdent"));
var _promisify = _interopRequireDefault(require("./promisify"));
var _sleep = _interopRequireDefault(require("./sleep"));
var _unbase = _interopRequireDefault(require("./unbase64"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

let mixins = {
  abstract: _abstract.default,
  alwaysPromise: _alwaysPromise.default,
  base64: _base.default,
  consoleLogTime: _consoleLogTime.default,
  mapValuesDeep: _mapValuesDeep.default,
  naiveChecksum: _naiveChecksum.default,
  onceIn: _onceIn.default,
  outdent: _outdent.default,
  promisify: _promisify.default,
  sleep: _sleep.default,
  unbase64: _unbase.default };


// eslint-disable-next-line firecloud/no-underscore-prefix-exported
exports.mixins = mixins;let _ = function () {
  let vanillaLodash = _lodash.default.runInContext();
  vanillaLodash.mixin(exports.mixins);
  return vanillaLodash;
}();exports._ = _;var _default = exports._;exports.default = _default;

//# sourceMappingURL=index.js.map