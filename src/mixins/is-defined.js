/**
 * Part of `lodash-firecloud`.
 *
 * Checks if value is defined.
 *
 * @param {?} value The value to check.
 * @returns {boolean} Returns true if value is defined, else false.
 */
export let isDefined = function(value) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;
  return !_.isUndefined(value);
};
