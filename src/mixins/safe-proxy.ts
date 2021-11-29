import _ from 'lodash';

// NOTE if you need to check if an env var exist, use
// '<var>' in someProxy
// e.g. if ('PATH' in _.safeProxy(process.env)) { ...do smth with _.safeProxy(process.env).PATH... }

/**
 * Part of `lodash-y`.
 *
 * Create Proxy to an object object that will throw if a property is not set (nil).
 *
 * @param env The object.
 * @returns Return a safe Proxy to env.
 */
export let safeProxy = function(env: _.Dictionary<unknown>): _.Dictionary<unknown> {
  // eslint-disable-next-line fp/no-proxy
  return new Proxy(env, {
    get: function(target, property, _receiver): unknown {
      if (_.isSymbol(property)) {
        return target[property as any];
      }

      if (_.includes([
        'constructor',
        'length'
      ], property)) {
        return target[property];
      }

      if (property === 'clone') {
        return function() {
          let newTarget = _.clone(target);
          return safeProxy(newTarget);
        };
      }

      // support async/await syntax
      if (property === 'then') {
        return;
      }

      if (_.isNil(target[property])) {
        throw new Error(`${property} is not set.`);
      }

      return target[property];
    }
  });
};
