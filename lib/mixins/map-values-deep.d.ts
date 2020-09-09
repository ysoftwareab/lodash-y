import { Fn } from '../types';
/**
 * Part of `lodash-firecloud`.
 *
 * Map an object and all of its plain-object properties' values depth-wise with a given `fn`.
 *
 * @param origFn A function to process object and each of its plain-object properties.
 * Should return a value (processed object).
 * @returns Returns a function that accepts an object, on which `fn` will be invoked with a list of `args`.
 */
export declare let mapValuesDeep: (origFn: Fn) => Fn;
