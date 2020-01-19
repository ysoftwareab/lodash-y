import _ from 'lodash';
/**
 * Part of `lodash-firecloud`.
 *
 * Create Proxy to an object object that will throw if a property is not set (nil).
 *
 * @param env The object.
 * @returns Return a safe Proxy to env.
 */
export declare let safeProxy: (env: _.Dictionary<unknown>) => _.Dictionary<unknown>;
