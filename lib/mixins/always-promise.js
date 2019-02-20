"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.alwaysPromise = void 0;let alwaysPromise = function (maybePromiseLike) {
  // eslint-disable-next-line consistent-this, no-invalid-this
  let _ = this;

  if (!_.isPlainObject(maybePromiseLike) && !_.isFunction(maybePromiseLike)) {
    return Promise.resolve(maybePromiseLike);
  }

  if (!_.isFunction(maybePromiseLike.then)) {
    return Promise.resolve(maybePromiseLike);
  }

  return maybePromiseLike;
};exports.alwaysPromise = alwaysPromise;var _default = exports.alwaysPromise;exports.default = _default;

//# sourceMappingURL=always-promise.js.map