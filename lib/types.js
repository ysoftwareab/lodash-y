"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _exportNames = { UT: true };exports.UT = void 0;var _UT = _interopRequireWildcard(require("utility-types"));














































var _typesCallbacks = require("./types-callbacks");Object.keys(_typesCallbacks).forEach(function (key) {if (key === "default" || key === "__esModule") return;if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;Object.defineProperty(exports, key, { enumerable: true, get: function () {return _typesCallbacks[key];} });});

var _typesClasses = require("./types-classes");Object.keys(_typesClasses).forEach(function (key) {if (key === "default" || key === "__esModule") return;if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;Object.defineProperty(exports, key, { enumerable: true, get: function () {return _typesClasses[key];} });});

var _typesCore = require("./types-core");Object.keys(_typesCore).forEach(function (key) {if (key === "default" || key === "__esModule") return;if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;Object.defineProperty(exports, key, { enumerable: true, get: function () {return _typesCore[key];} });});

var _typesFunctions = require("./types-functions");Object.keys(_typesFunctions).forEach(function (key) {if (key === "default" || key === "__esModule") return;if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;Object.defineProperty(exports, key, { enumerable: true, get: function () {return _typesFunctions[key];} });});

var _typesJson = require("./types-json");Object.keys(_typesJson).forEach(function (key) {if (key === "default" || key === "__esModule") return;if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;Object.defineProperty(exports, key, { enumerable: true, get: function () {return _typesJson[key];} });});

var _typesStruct = require("./types-struct");Object.keys(_typesStruct).forEach(function (key) {if (key === "default" || key === "__esModule") return;if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;Object.defineProperty(exports, key, { enumerable: true, get: function () {return _typesStruct[key];} });});

var _typesStructKeys = require("./types-struct-keys");Object.keys(_typesStructKeys).forEach(function (key) {if (key === "default" || key === "__esModule") return;if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;Object.defineProperty(exports, key, { enumerable: true, get: function () {return _typesStructKeys[key];} });});function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function () {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;} // -----------------------------------------------------------------------------
// https://github.com/piotrwitek/utility-types is a good library
// but some types are not properly tested
// e.g. Primitive didn't have undefined and null until 2019-10-21, since added in 2019-04-02
let UT = _UT;exports.UT = UT;

//# sourceMappingURL=types.js.map