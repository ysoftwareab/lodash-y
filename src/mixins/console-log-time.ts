import {
  MaybePromise
} from '../types';

/**
 * Part of `lodash-y`.
 *
 * Log execution time of a function.
 *
 * @param label Label for current measurement, that will be displayed in the console.
 * @param fn A function to measure execution time of.
 * @returns Returns the return value of the function.
 */
export let consoleLogTime = async function<TReturn extends MaybePromise>(
  label: string,
  fn: () => TReturn
): Promise<TReturn> {
  // eslint-disable-next-line no-console
  console.log(label);

  // eslint-disable-next-line no-console
  console.time(label);

  let returnValue = await fn();

  // eslint-disable-next-line no-console
  console.timeEnd(label);
  return returnValue;
};
