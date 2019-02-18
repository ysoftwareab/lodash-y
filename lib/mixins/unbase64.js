"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.unbase64 = void 0;let unbase64 = function (string) {
  let result = Buffer.from(string, 'base64').toString();
  return result;
};exports.unbase64 = unbase64;var _default = exports.unbase64;exports.default = _default;

//# sourceMappingURL=unbase64.js.map