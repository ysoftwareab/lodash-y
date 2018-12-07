"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
let alwaysPromise = exports.alwaysPromise = function (maybePromiseLike) {
  // eslint-disable-next-line consistent-this, no-invalid-this
  let _ = this;

  if (!_.isPlainObject(maybePromiseLike) && !_.isFunction(maybePromiseLike)) {
    return Promise.resolve(maybePromiseLike);
  }

  if (!_.isFunction(maybePromiseLike.then)) {
    return Promise.resolve(maybePromiseLike);
  }

  return maybePromiseLike;
};

exports.default = exports.alwaysPromise;

//# sourceMappingURL=always-promise.js.map