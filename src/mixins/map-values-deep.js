/**
 * Part of `lodash-firecloud`.
 *
 * Map an object and all of its plain-object properties' values depth-wise with a given `fn`.
 *
 * @param {Function} fn A function to process object and each of its plain-object properties.
 * Should return a value (processed object).
 * @returns {Function} Returns a function that accepts an object, on which `fn` will be invoked with a list of `args`.
 */
export let mapValuesDeep = function(fn) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  return function(obj, ...args) {
    return fn(_.mapValues(obj, function(v) {
      return _.isPlainObject(v) ? _.mapValuesDeep(fn)(v, ...args) : v;
    }), ...args);
  };
};
