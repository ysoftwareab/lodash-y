'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
let base64 = exports.base64 = function (string) {
  // eslint-disable-next-line consistent-this, no-invalid-this
  let _ = this;

  let result = Buffer.from(string).toString('base64');
  result = _.replace(result, /=+$/, '');
  return result;
};

exports.default = exports.base64;

//# sourceMappingURL=base64.js.map