"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports._ = exports.mixins = void 0;var _mixins = _interopRequireWildcard(require("./mixins"));
var _mixinsNode = _interopRequireWildcard(require("./mixins-node"));
var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function () {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}





let mixins = {
  ..._mixins,
  ..._mixinsNode };


// eslint-disable-next-line firecloud/no-underscore-prefix-exported
exports.mixins = mixins;let _ = _lodash.default.runInContext().mixin(exports.mixins);exports._ = _;var _default = exports._;exports.default = _default;

//# sourceMappingURL=index-node.js.map