"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.unbase64 = void 0;let unbase64 = function (string) {
  let result = Buffer.from(string, 'base64').toString();
  return result;
};exports.unbase64 = unbase64;

//# sourceMappingURL=unbase64.js.map