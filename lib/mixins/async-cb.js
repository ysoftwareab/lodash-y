"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.asyncCb = void 0;






/**
                                                                                                      * Part of `lodash-firecloud`.
                                                                                                      *
                                                                                                      * Create a void-returning Function that executes an AsyncFunction with a catch handler.
                                                                                                      * It is intended to handle situations highlighted by @typescript-eslint/no-misused-promises eslint rule,
                                                                                                      * specifically the termination of the process for unhandled promise rejections.
                                                                                                      * See https://github.com/nodejs/node/issues/20392 .
                                                                                                      * See https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin .
                                                                                                      *
                                                                                                      * @param [callback] Async callback.
                                                                                                      * @returns Returns a sync callback wrapper.
                                                                                                      */
let asyncCb = function (cb) {
  return function (...args) {
    // eslint-disable-next-line callback-return
    cb(...args).catch(function (err) {
      throw err;
    });
  };
};exports.asyncCb = asyncCb;

//# sourceMappingURL=async-cb.js.map