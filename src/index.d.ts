import lodash from 'lodash';
export = lodash;

declare module "lodash" {
  interface LoDashStatic {
    /**
     * Create a stub function that throws an error when invoked. Supposed to be overriden.
     *
     * @param {string} [name='it] Name of the method to be abstracted.
     * @returns Returns a function that throws error when invoked.
     */
    abstract(name: string = 'it'): () => void;

    /**
     * Convert a string to Base64 format.
     * @param {string} string Input string.
     * @returns {string} Returns Base64-encoded string.
    */
    base64(string: string): string;

    /**
     * Log execution time of a function.
     * @param {string} label Label for current measurement, that will be displayed in the console.
     * @param fn A function to measure execution time of.
     */
    consoleLogTime(label: string, fn: () => any): void;

    /**
     * Process an object and all of it's object properties depth-wise with a given `fn`.
     * @param fn A function to process each "level" of the object.
     * @returns Returns a function that accepts an object, on which `fn` will be invoked with a list of `args`.
    */
    deeply(fn: (...args: any[]) => any): (obj: any, ...fnArgs: any[]) => any;

    /**
     * Decode Base64 string.
     * @param {string} string Input string in Base64 format.
     * @returns {string} Returns decoded string.
    */
    unbase64(string: string): string;
  }
}
