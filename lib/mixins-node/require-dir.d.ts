/**
 * Part of `lodash-firecloud`.
 *
 * Require all Node.js modules in a directory.
 *
 * @param dir The directory.
 * @param filter The allowed extensions for 'require' or a filtering function.
 * @returns Returns an array of required modules.
 */
export declare let requireDir: (dir: string, filter?: Function | RegExp | string[]) => unknown[];
