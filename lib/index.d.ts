import lodash from 'lodash';

export = lodash;

declare module 'lodash' {
  interface LoDashStatic {

    /**
     * Part of `lodash-firecloud`.
     *
     * Create a stub function that throws an error when invoked. Supposed to be overriden.
     *
     * @param {string} [name='it] Name of the method to be abstracted.
     * @returns Returns a function that throws error when invoked.
     */
    abstract(name: string): () => void;

    /**
     * Part of `lodash-firecloud`.
     *
     * Always return a Promise out of a Promise-like (passthrough) or something else (promisify).
     * Useful for cases where you allow for a function to return a Promise or not.
     * e.g. await alwaysPromise(fn(arg1, arg2));
     *
     * @param maybePromiseLike An instance of a Promise-like or just about anything.
     * @returns Returns a Promise, the one given or one that resolve.
     */
    alwaysPromise(maybePromiseLike: any): Promise<any>;

    /**
     * Part of `lodash-firecloud`.
     *
     * Convert a string to Base64 format.
     * @param {string} string Input string.
     * @returns {string} Returns Base64-encoded string.
     */
    base64(string: string): string;

    // A proper way to write this definition
    // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/adone/glosses/promise.d.ts
    /**
     * Part of `lodash-firecloud`.
     *
     * Convert Promise into callback-like function.
     *
     * @param fn Promise to callbackify.
     * @param options Options object.
     * @param {boolean} [options.callbackFirst='false'] Specifies if callback is a first arg.
     * @param {boolean} [options.errorInCallback='true'] Specifies if the first arg of callback is an error.
     * @param {boolean} [options.keepCallback='false'] Specifies if the callback arg should be passed to the Promise.
     * @returns Returns a callback-like function wrapping original `fn`.
     */
    callbackify(fn: (...args: any[]) => any): (...args: any[]) => any;

    /**
     * Part of `lodash-firecloud`.
     *
     * Log execution time of a function.
     *
     * @param {string} label Label for current measurement, that will be displayed in the console.
     * @param fn A function to measure execution time of.
     */
    consoleLogTime(label: string, fn: () => any): Promise<void>;

    /**
     * Part of `lodash-firecloud`.
     *
     * Create Proxy to a process.env (or similar) object that will throw if a variable is undefined.
     */
    safeProxy(env: {
      [key: string]: string
    }): {
      [key: string]: string
    };

    /**
     * Part of `lodash-firecloud`.
     *
     * Create a Deferred object that references the promise, the resolve and reject functions.
     * @returns Returns the Deffered object.
     */
    defer(): {
      promise: Promise<void>,
      resolve: () => void,
      reject: () => void
    };

    /**
     * Part of `lodash-firecloud`.
     *
     * Checks if value is defined.
     *
     * @param value The value to check.
     * @return Returns true if value is defined, else false.
     */
    isDefined<T>(value: T | undefined): value is T;

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
     * Calculate a naïve checksum of a string.
     *
     * @param {string} string String to calculate checksum of.
     * @returns {string} Returns checksum.
     */
    naiveChecksum(string: string): string;

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

    /**
     * Part of `lodash-firecloud`.
     *
     * Tag to outdent template literals.
     *
     * @param {array} strings Template strings.
     * @param {...*} values Values.
     * @returns Returns an outdented string.
     */
    outdent(strings: TemplateStringsArray, ...values: any[]): string;

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
    promisify(
      fn: (...args: any[]) => any,
      options?: object
    ): (...args: any[]) => any;

    /**
     * Part of `lodash-firecloud`.
     *
     * Return a promise that is resolved after the desired sleep time.
     *
     * @param {number} ms=0 Number of milliseconds to sleep.
     * @returns {Promise} Returns the.
     */
    sleep(ms: number): Promise<void>;

    /**
    * Part of `lodash-firecloud`.
    *
    * Throttle exponentially
    *
    * @param func Function to throttle
    * @param wait Starting (minimum) wait time.
    * @param options Options object.
    * @param {boolean} [options.leading='true'] Specifies if `func` should be invoked on leading edge.
    * @param {boolean} [options.trailing='true'] Specifies if `func` should be invoked on trailing edge.
    * @param {boolean} [options.maxWait=Infinity] Specifies max value of `wait` as it exponentially grows.
    * @param {boolean} [options.multiplier=2] Specifies a multiplier for `wait` applied on every actual invocation.
    * @param {boolean} [options.divider=Infinity] Specifies a divider for `wait` used on actual invocation
    * if the previous call was not throttled.
    * @returns Returns a function which is `func` throttled. Has `cancel` and `flush` methods, same to _.throttle.
    */
    throttleExp<T extends (...args: any) => any>(func: T, wait?: number, options?: ThrottleExpSettings): T & Cancelable;

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

  interface ThrottleExpSettings {
    leading?: boolean;
    trailing?: boolean;
    multiplier?: number;
    divider?: number;
    maxWait?: number;
  }

  interface Cancelable {
    cancel(): void;
    flush(): void;
  }
}
