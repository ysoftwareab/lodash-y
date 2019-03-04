export let safeProxy = function(env) {
  // eslint-disable-next-line consistent-this, no-invalid-this
  let _ = this;

  // eslint-disable-next-line fp/no-proxy
  return new Proxy(env, {
    get: function(target, property, _receiver) {
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
