/**
 * Part of `lodash-firecloud`.
 *
 * Calculate a naïve checksum of a string.
 *
 * @param {string} string String to calculate checksum of.
 * @returns {string} Returns checksum.
 */
export let naiveChecksum = function(string) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;
  let checksums = [];
  let checksum = 0;

  _.forEach(string, function(_char, index) {
    let charChecksum = string.charCodeAt(index) * (index + 1);
    if (!Number.isSafeInteger(checksum + charChecksum)) {
      checksums.push(checksum);
      checksum = 0;
    }
    checksum = checksum + charChecksum;
  });
  checksums.push(checksum);

  checksums = _.map(checksums, function(checksum) {
    return checksum.toString(16);
  });

  let joinedChecksum = _.join(checksums, '');

  return joinedChecksum;
};
