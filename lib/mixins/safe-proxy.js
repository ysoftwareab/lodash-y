"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.safeProxy = void 0;var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// NOTE if you need to check if an env var exist, use
// '<var>' in someProxy
// e.g. if ('PATH' in _.safeProxy(process.env)) { ...do smth with _.safeProxy(process.env).PATH... }

/**
 * Part of `lodash-firecloud`.
 *
 * Create Proxy to an object object that will throw if a property is not set (nil).
 *
 * @param env The object.
 * @returns Return a safe Proxy to env.
 */
let safeProxy = function (env) {
  // eslint-disable-next-line fp/no-proxy
  return new Proxy(env, {
    get: function (target, property, _receiver) {
      if (_lodash.default.isSymbol(property)) {
        return target[property];
      }

      if (_lodash.default.includes([
      'constructor',
      'length'],
      property)) {
        return target[property];
      }

      if (property === 'clone') {
        return function () {
          let newTarget = _lodash.default.clone(target);
          return safeProxy(newTarget);
        };
      }

      // support async/await syntax
      if (property === 'then') {
        return;
      }

      if (_lodash.default.isNil(target[property])) {
        throw new Error(`${property} is not set.`);
      }

      return target[property];
    } });

};exports.safeProxy = safeProxy;

//# sourceMappingURL=safe-proxy.js.map