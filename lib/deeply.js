"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
let deeply = exports.deeply = function (fn) {
  // eslint-disable-next-line consistent-this, no-invalid-this
  let _ = this;

  return function (obj, ...args) {
    return fn(_.mapValues(obj, function (v) {
      return _.isPlainObject(v) ? _.deeply(fn)(v, ...args) : v;
    }), ...args);
  };
};

exports.default = deeply;

//# sourceMappingURL=deeply.js.map