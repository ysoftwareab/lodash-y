/**
 * Part of `lodash-firecloud`.
 *
 * Log execution time of a function.
 *
 * @param label Label for current measurement, that will be displayed in the console.
 * @param fn A function to measure execution time of.
 * @returns Returns the return value of the function.
 */
export declare let consoleLogTime: <TReturn extends unknown>(label: string, fn: () => TReturn) => Promise<TReturn>;
