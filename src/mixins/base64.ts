import _ from 'lodash';

/**
 * Part of `lodash-y`.
 *
 * Encode a string to Base64.
 *
 * @param string Input string.
 * @returns Base64-encoded string.
 */
export let base64 = function(string: string): string {
  let result = Buffer.from(string).toString('base64');
  result = _.replace(result, /=+$/, '');
  return result;
};
