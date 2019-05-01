export let safeProxy = function(env) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  // eslint-disable-next-line fp/no-proxy
  return new Proxy(env, {
    get: function(target, property, _receiver) {
      if (_.isSymbol(property) || _.includes([
        'constructor',
        'length'
      ], property)) {
        return target[property];
      }

      if (property === '_') {
        return target;
      }
      if (!_.isString(target[property])) {
        throw new Error(`${property} is undefined.`);
      }
      return target[property];
    }
  });
};
