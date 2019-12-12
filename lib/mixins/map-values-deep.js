"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapValuesDeep = void 0;var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}





/**
                                                                                                                                                                                                                                                                 * Part of `lodash-firecloud`.
                                                                                                                                                                                                                                                                 *
                                                                                                                                                                                                                                                                 * Map an object and all of its plain-object properties' values depth-wise with a given `fn`.
                                                                                                                                                                                                                                                                 *
                                                                                                                                                                                                                                                                 * @param origFn A function to process object and each of its plain-object properties.
                                                                                                                                                                                                                                                                 * Should return a value (processed object).
                                                                                                                                                                                                                                                                 * @returns Returns a function that accepts an object, on which `fn` will be invoked with a list of `args`.
                                                                                                                                                                                                                                                                 */
let mapValuesDeep = function (origFn) {
  let fn = function (obj, ...args) {
    return origFn(_lodash.default.mapValues(obj, function (v) {
      return _lodash.default.isPlainObject(v) ? mapValuesDeep(origFn)(v, ...args) : v;
    }), ...args);
  };
  return fn;
};exports.mapValuesDeep = mapValuesDeep;

//# sourceMappingURL=map-values-deep.js.map