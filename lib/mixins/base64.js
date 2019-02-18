"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.base64 = void 0;let base64 = function (string) {
  // eslint-disable-next-line consistent-this, no-invalid-this
  let _ = this;

  let result = Buffer.from(string).toString('base64');
  result = _.replace(result, /=+$/, '');
  return result;
};exports.base64 = base64;var _default = exports.base64;exports.default = _default;

//# sourceMappingURL=base64.js.map