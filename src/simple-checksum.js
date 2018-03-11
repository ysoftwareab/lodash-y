export let simpleChecksum = function(str) {
  // eslint-disable-next-line consistent-this, no-invalid-this
  let _ = this;
  let checksums = [];
  let checksum = 0;

  _.forEach(str, function(_char, index) {
    let charChecksum = str.charCodeAt(index) * (index + 1);
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
  checksums = _.join(checksums, '');

  return checksums;
};

export default simpleChecksum;
