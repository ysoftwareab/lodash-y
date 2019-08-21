"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.sleep = void 0;let sleep = function (ms = 0) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  return new Promise(function (resolve, _reject) {
    _.delay(resolve, ms);
  });
};exports.sleep = sleep;

//# sourceMappingURL=sleep.js.map