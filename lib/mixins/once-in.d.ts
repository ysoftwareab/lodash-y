/// <reference path="../index.d.ts" />
/// <reference types="lodash" />
/// <reference types="lodash/common/common" />
/// <reference types="lodash/common/array" />
/// <reference types="lodash/common/collection" />
/// <reference types="lodash/common/date" />
/// <reference types="lodash/common/function" />
/// <reference types="lodash/common/lang" />
/// <reference types="lodash/common/math" />
/// <reference types="lodash/common/number" />
/// <reference types="lodash/common/object" />
/// <reference types="lodash/common/seq" />
/// <reference types="lodash/common/string" />
/// <reference types="lodash/common/util" />
/**
 * DEPRECATED. Use _.throttleTrue() instead.
 *
 * Part of `lodash-firecloud`.
 *
 * A "true" _.throttle with 'trailing': false".
 * A lightweight version which does not allocate unnecessary timer,
 * comparing to the original _.throttle (which invokes _.debounce under the hood).
 *
 * @param fn Function to throttle.
 * @param interval Throttling interval.
 * @returns Returns a throttled function.
 */
export declare let onceIn: <T extends import("../types-functions").Fn<unknown, unknown[]>>(origFn: T, interval: number) => T & import("lodash").Cancelable;
