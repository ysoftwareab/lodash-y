"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.isAsyncFunction = exports.AsyncFunction = void 0; // eslint-disable-next-line firecloud/underscore-prefix-non-exported, @typescript-eslint/explicit-function-return-type
let AsyncFunction = Object.getPrototypeOf(async function () {/* noop */}).constructor;

/**
                                                                                        * Part of `lodash-firecloud`.
                                                                                        *
                                                                                        * Checks if value is classified as an async Function object.
                                                                                        *
                                                                                        * @async
                                                                                        * @param [value] The value to check.
                                                                                        * @returns Returns true if value is an async function, else false.
                                                                                        */exports.AsyncFunction = AsyncFunction;
let isAsyncFunction = function (value) {
  return value instanceof exports.AsyncFunction;
};exports.isAsyncFunction = isAsyncFunction;

//# sourceMappingURL=is-async-function.js.map