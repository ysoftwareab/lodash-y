'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
let unbase64 = exports.unbase64 = function (string) {
  let result = Buffer.from(string, 'base64').toString();
  return result;
};

exports.default = exports.unbase64;

//# sourceMappingURL=unbase64.js.map