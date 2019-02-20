"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.sleep = void 0;let sleep = function (ms = 0) {
  // eslint-disable-next-line consistent-this, no-invalid-this
  let _ = this;

  return new Promise(function (resolve, _reject) {
    _.delay(resolve, ms);
  });
};exports.sleep = sleep;var _default = exports.sleep;exports.default = _default;

//# sourceMappingURL=sleep.js.map