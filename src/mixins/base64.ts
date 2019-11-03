import _ from 'lodash';

/**
 * Part of `lodash-firecloud`.
 *
 * Encode a string to Base64.
 *
 * @param {string} string Input string.
 * @returns {string} Base64-encoded string.
 */
export let base64 = function(string) {
  let result = Buffer.from(string).toString('base64');
  result = _.replace(result, /=+$/, '');
  return result;
};
