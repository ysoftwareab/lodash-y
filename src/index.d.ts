import lodash from 'lodash';
export = lodash;

declare module "lodash" {
  interface LoDashStatic {
    /**
     * Part of `lodash-firecloud`.
     *
     * Create a stub function that throws an error when invoked. Supposed to be overriden.
     *
     * @param {string} [name='it] Name of the method to be abstracted.
     * @returns Returns a function that throws error when invoked.
     */
    abstract(name: string = 'it'): () => void;

    /**
     * Part of `lodash-firecloud`.
     *
     * Convert a string to Base64 format.
     * @param {string} string Input string.
     * @returns {string} Returns Base64-encoded string.
     */
    base64(string: string): string;

    /**
     * Part of `lodash-firecloud`.
     *
     * Log execution time of a function.
     *
     * @param {string} label Label for current measurement, that will be displayed in the console.
     * @param fn A function to measure execution time of.
     */
    consoleLogTime(label: string, fn: () => any): void;

    /**
     * Part of `lodash-firecloud`.
     *
     * Map an object and all of its plain-object properties' values depth-wise with a given `fn`.
     *
     * @param fn A function to process object and each of its plain-object properties.
     * Should return a value (processed object).
     * @returns Returns a function that accepts an object, on which `fn` will be invoked with a list of `args`.
     */
    mapValuesDeep(fn: (...args: any[]) => any): (obj: any, ...fnArgs: any[]) => any;

    /**
     * Part of `lodash-firecloud`.
     *
     * A "true _.throttle with 'trailing': false"
     * More lightweight version which does not allocate unnecessary timer,
     * comparing to lodash func (which invokes _.debounce under the hood)
     *
     * @param fn Function to throttle.
     * @param interval Throttling interval.
     * @returns Returns a throttled function.
     */
    onceIn(fn: (...args: any[]) => any, interval: number): (...args: any[]) => any;

    // A proper way to write this definition
    // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/adone/glosses/promise.d.ts
    /**
     * Part of `lodash-firecloud`.
     *
     * Convert callback-like function into Promise.
     *
     * @param fn Callback-based function to promisify.
     * @param options Options object.
     * @param {boolean} [options.callbackFirst='false'] Specifies if callback is a first arg.
     * @param {boolean} [options.errorInCallback='true'] Specifies if the first arg of callback is an error.
     * @returns Returns a Promise object wrapping original `fn`.
     */
    promisify(fn: (...args: any[]) => any, options: object): (...args: any[]) => any;

    /**
     * Part of `lodash-firecloud`.
     *
     * Calculate a simple checksum of a string.
     *
     * @param {string} string String to calculate checksum of.
     * @returns {string} Returns checksum.
     */
    simpleChecksum(string: string): string;

    /**
     * Part of `lodash-firecloud`.
     *
     * Return a promise that is resolved after the desired sleep time.
     *
     * @param {integer} ms=0 Number of milliseconds to sleep.
     * @returns {Promise} Returns the.
     */
    sleep(ms: integer): Promise<void>;

    /**
     * Part of `lodash-firecloud`.
     *
     * Decode Base64 string.
     *
     * @param {string} string Input string in Base64 format.
     * @returns {string} Returns decoded string.
     */
    unbase64(string: string): string;
  }
}
