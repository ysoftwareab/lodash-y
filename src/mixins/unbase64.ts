/**
 * Part of `lodash-y`.
 *
 * Decode a Base64-encoded string.
 *
 * @param string Base64-encoded string.
 * @returns Decoded string.
 */
export let unbase64 = function(string: string): string {
  let result = Buffer.from(string, 'base64').toString();
  return result;
};
