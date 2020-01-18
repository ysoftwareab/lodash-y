// eslint-disable-next-line firecloud/underscore-prefix-non-exported, @typescript-eslint/explicit-function-return-type
let AsyncFunction = Object.getPrototypeOf(async function() { /* noop */ }).constructor;

/**
 * Part of `lodash-firecloud`.
 *
 * Checks if value is classified as an async Function object.
 *
 * @async
 * @param [value] The value to check.
 * @returns Returns true if value is an async function, else false.
 */
export let isAsyncFunction = function(value: unknown): boolean {
  return value instanceof AsyncFunction;
};
