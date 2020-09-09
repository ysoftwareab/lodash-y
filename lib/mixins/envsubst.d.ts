/**
 * Part of `lodash-firecloud`.
 *
 * Substitute environment variables á la envsubst.
 *
 * @param text The textual source.
 * @param env Dictionary of environment variables.
 * @returns Returns .
 */
export declare let envsubst: (text: string, env: {
    [key: string]: string;
}) => string;
