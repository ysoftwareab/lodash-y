import _ from 'lodash';

/**
 * Part of `lodash-firecloud`.
 *
 * Checks if value is defined.
 *
 * @param value The value to check.
 * @returns Returns true if value is defined, else false.
 */
export let isDefined = function(value: unknown): boolean {
  return !_.isUndefined(value);
};
