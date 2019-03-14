// NOTE if you need to check if an env var exist, use
// '<var>' in someProxy
// e.g. if ('PATH' in _.safeProxy(process.env)) { ...do smth with _.safeProxy(process.env).PATH... }

export let safeProxy = function(env) {
  // eslint-disable-next-line consistent-this, no-invalid-this
  let _ = this;

  // eslint-disable-next-line fp/no-proxy
  return new Proxy(env, {
    get: function(target, property, _receiver) {
      if (!_.isString(target[property])) {
        throw new Error(`${property} is undefined.`);
      }
      return target[property];
    }
  });
};
