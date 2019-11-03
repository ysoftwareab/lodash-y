import _ from 'lodash';

/**
 * Part of `lodash-firecloud`.
 *
 * Checks if value is defined.
 *
 * @param {?} value The value to check.
 * @returns {boolean} Returns true if value is defined, else false.
 */
export let isDefined = function(value) {
  return !_.isUndefined(value);
};
