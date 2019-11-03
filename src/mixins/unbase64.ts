/**
 * Part of `lodash-firecloud`.
 *
 * Decode a Base64-encoded string.
 *
 * @param {string} string Base64-encoded string.
 * @returns {string} Decoded string.
 */
export let unbase64 = function(string) {
  let result = Buffer.from(string, 'base64').toString();
  return result;
};
