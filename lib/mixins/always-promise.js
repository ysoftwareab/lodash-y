"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.alwaysPromise = void 0;let alwaysPromise = function (maybePromiseLike) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  return Promise.resolve(maybePromiseLike);
};exports.alwaysPromise = alwaysPromise;

//# sourceMappingURL=always-promise.js.map