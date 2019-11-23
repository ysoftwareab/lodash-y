import { Fn } from '../types';
/**
 * Part of `lodash-firecloud`.
 *
 * Create a stub function that throws an error when invoked. Supposed to be overriden.
 *
 * @param [name='it'] Name of the method to be abstracted.
 * @returns Returns a function that throws error when invoked.
 */
export declare let abstract: (name?: string) => Fn<never, unknown[]>;
