"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.mapValuesDeep = void 0;let mapValuesDeep = function (fn) {
  // eslint-disable-next-line consistent-this, no-invalid-this
  let _ = this;

  return function (obj, ...args) {
    return fn(_.mapValues(obj, function (v) {
      return _.isPlainObject(v) ? _.mapValuesDeep(fn)(v, ...args) : v;
    }), ...args);
  };
};exports.mapValuesDeep = mapValuesDeep;var _default = exports.mapValuesDeep;exports.default = _default;

//# sourceMappingURL=map-values-deep.js.map