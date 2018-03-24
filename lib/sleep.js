"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
let sleep = exports.sleep = function (ms = 0) {
  // eslint-disable-next-line consistent-this, no-invalid-this
  let _ = this;

  return new Promise(function (resolve, _reject) {
    _.delay(resolve, ms);
  });
};

exports.default = exports.sleep;

//# sourceMappingURL=sleep.js.map