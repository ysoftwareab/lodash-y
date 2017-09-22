export let deeply = function(fn) {
  // eslint-disable-next-line consistent-this, no-invalid-this
  let _ = this;

  return function(obj, iteratee) {
    return fn(_.mapValues(obj, function(v) {
      return _.isPlainObject(v) ? _.deeply(fn)(v, iteratee) : v;
    }), iteratee);
  };
};

export default deeply;
