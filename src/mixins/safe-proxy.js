// NOTE if you need to check if an env var exist, use
// '<var>' in someProxy
// e.g. if ('PATH' in _.safeProxy(process.env)) { ...do smth with _.safeProxy(process.env).PATH... }

/**
 * Part of `lodash-firecloud`.
 *
 * Create Proxy to an object object that will throw if a property is not set (nil).
 *
 * @param {Object} env The object.
 * @returns {Proxy} Return a safe Proxy to env.
 */
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

      if (property === 'clone') {
        return function() {
          let newTarget = _.clone(target);
          return _.safeProxy(newTarget);
        };
      }

      // support async/await syntax
      if (property === 'then') {
        return;
      }

      if (_.isNil(target[property])) {
        // @ts-ignore
        throw new Error(`${property} is not set.`);
      }

      return target[property];
    }
  });
};
