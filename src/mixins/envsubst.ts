import _ from 'lodash';

/**
 * Part of `lodash-firecloud`.
 *
 * Substitute environment variables á la envsubst.
 *
 * @param text The textual source.
 * @param env Dictionary of environment variables.
 * @returns Returns .
 */
export let envsubst = function(text: string, env: {[key: string]: string;}): string {
  let result = _.replace(text, /\$\{?(\w+)\}?/g, function(match, key) {
    return _.defaultTo(env[key], match);
  });
  return result;
};
