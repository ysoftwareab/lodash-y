"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.limitInParallel = exports.LimitInParallelError = void 0;var _lodash = _interopRequireDefault(require("lodash"));







var _isAsyncFunction = require("./is-async-function");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}



// useful for checks like `err instanceof _.LimitInParallelError`
class LimitInParallelError extends Error {}exports.LimitInParallelError = LimitInParallelError;







// TODO is there a way not to duplicate the function just because origFn is sync or async?

/**
 * Part of `lodash-firecloud`.
 *
 * Create a function that can only run maximum n times in parallel.
 *
 * @param origFn The function to have its parallelism limited.
 * @param options The options.
 * @param [options.limit=1] Specifies the maximum number of parallel executions.
 * @param [options.throwErr=false] Specifies whether to throw an error when the limit has been reached.
 * @returns Returns the new limited function.
 */
// eslint-disable-next-line @typescript-eslint/promise-function-async, @typescript-eslint/explicit-function-return-type
let limitInParallel = function (

origFn, options =


{}) {
  _lodash.default.defaults(options, {
    limit: 1,
    throwErr: false });

  let activeCount = 0;

  if ((0, _isAsyncFunction.isAsyncFunction)(origFn)) {
    let fn = async function (...args) {
      if (activeCount >= options.limit) {
        let err = new LimitInParallelError(`Can only run this function maximum ${options.limit} times in parallel.`);
        if (options.throwErr) {
          throw err;
        }
        return err;
      }
      activeCount = activeCount + 1;

      let result;
      let err;
      try {
        result = await (async createError => {try {return await origFn(...args);} catch (_awaitTraceErr) {let err = createError();_awaitTraceErr.stack += "\n...\n" + err.stack;throw _awaitTraceErr;}})(() => new Error());
      } catch (err2) {
        err = err2;
      } finally {
        activeCount = activeCount - 1;
      }

      if (!_lodash.default.isUndefined(err)) {
        throw err;
      }
      return result;
    };
    // @ts-ignore
    return fn;
  }

  let fn = function (...args) {
    if (activeCount >= options.limit) {
      let err = new LimitInParallelError(`Can only run this function maximum ${options.limit} times in parallel.`);
      if (options.throwErr) {
        throw err;
      }
      return err;
    }
    activeCount = activeCount + 1;

    let result;
    let err;
    try {
      result = origFn(...args);
    } catch (err2) {
      err = err2;
    } finally {
      activeCount = activeCount - 1;
    }

    if (!_lodash.default.isUndefined(err)) {
      throw err;
    }
    return result;
  };
  // @ts-ignore
  return fn;
};exports.limitInParallel = limitInParallel;

//# sourceMappingURL=limit-in-parallel.js.map