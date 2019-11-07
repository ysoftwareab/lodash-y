"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.base64 = void 0;var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                          * Part of `lodash-firecloud`.
                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                          * Encode a string to Base64.
                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                          * @param string Input string.
                                                                                                                                                                                                                                                          * @returns Base64-encoded string.
                                                                                                                                                                                                                                                          */
let base64 = function (string) {
  let result = Buffer.from(string).toString('base64');
  result = _lodash.default.replace(result, /=+$/, '');
  return result;
};exports.base64 = base64;

//# sourceMappingURL=base64.js.map