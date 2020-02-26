"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.naiveChecksum = void 0;var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                 * Part of `lodash-firecloud`.
                                                                                                                                                                                                                                                                 *
                                                                                                                                                                                                                                                                 * Calculate a naïve checksum of a string.
                                                                                                                                                                                                                                                                 *
                                                                                                                                                                                                                                                                 * @param string String to calculate checksum of.
                                                                                                                                                                                                                                                                 * @returns Returns checksum.
                                                                                                                                                                                                                                                                 */
let naiveChecksum = function (string) {
  let checksums = [];
  let checksum = 0;

  _lodash.default.forEach(string, function (_char, index) {
    let charChecksum = string.charCodeAt(index) * (index + 1);
    if (!Number.isSafeInteger(checksum + charChecksum)) {
      checksums.push(checksum);
      checksum = 0;
    }
    checksum = checksum + charChecksum;
  });
  checksums.push(checksum);

  checksums = _lodash.default.map(checksums, function (checksum) {
    return checksum.toString(16);
  });

  let joinedChecksum = _lodash.default.join(checksums, '');

  return joinedChecksum;
};exports.naiveChecksum = naiveChecksum;

//# sourceMappingURL=naive-checksum.js.map