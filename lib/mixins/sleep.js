"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.sleep = void 0;var _lodash = _interopRequireDefault(require("lodash"));

var _deferred = require("./deferred");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}



/**
                                                                                                                                     * Part of `lodash-firecloud`.
                                                                                                                                     *
                                                                                                                                     * An async function that is resolved after a desired sleep time.
                                                                                                                                     *
                                                                                                                                     * @async
                                                                                                                                     * @param [ms=0] Number of milliseconds to sleep.
                                                                                                                                     * @returns .
                                                                                                                                     */
let sleep = async function (ms = 0) {
  let d = (0, _deferred.deferred)();
  _lodash.default.delay(function () {
    d.resolve();
  }, ms);
  await (async createError => {try {return await d.promise;} catch (_awaitTraceErr) {let err = createError();_awaitTraceErr.stack += "\n...\n" + err.stack;throw _awaitTraceErr;}})(() => new Error());
};exports.sleep = sleep;

//# sourceMappingURL=sleep.js.map