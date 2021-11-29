import _ from 'lodash';

/**
 * Part of `lodash-y`.
 *
 * Calculate a naïve checksum of a string.
 *
 * @param string String to calculate checksum of.
 * @returns Returns checksum.
 */
export let naiveChecksum = function(string: string): string {
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
