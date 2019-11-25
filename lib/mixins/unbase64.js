"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.unbase64 = void 0; /**
                                                                                                       * Part of `lodash-firecloud`.
                                                                                                       *
                                                                                                       * Decode a Base64-encoded string.
                                                                                                       *
                                                                                                       * @param string Base64-encoded string.
                                                                                                       * @returns Decoded string.
                                                                                                       */
let unbase64 = function (string) {
  let result = Buffer.from(string, 'base64').toString();
  return result;
};exports.unbase64 = unbase64;

//# sourceMappingURL=unbase64.js.map