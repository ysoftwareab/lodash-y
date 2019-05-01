export let mapValuesDeep = function(fn) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  return function(obj, ...args) {
    return fn(_.mapValues(obj, function(v) {
      return _.isPlainObject(v) ? _.mapValuesDeep(fn)(v, ...args) : v;
    }), ...args);
  };
};
