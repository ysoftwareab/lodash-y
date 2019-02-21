"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports._ = exports.mixins = void 0;var _lodash = _interopRequireDefault(require("lodash"));
var _mixins2 = _interopRequireDefault(require("./mixins"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

let mixins = _lodash.default.mapValues(_mixins2.default, function (mixinModule) {
  mixinModule = `./mixins/${mixinModule}`;

  // eslint-disable-next-line global-require
  return require(mixinModule).default;
});

// eslint-disable-next-line firecloud/no-underscore-prefix-exported
exports.mixins = mixins;let _ = function () {
  let vanillaLodash = _lodash.default.runInContext();
  vanillaLodash.mixin(exports.mixins);
  return vanillaLodash;
}();exports._ = _;var _default = exports._;exports.default = _default;

//# sourceMappingURL=index.js.map