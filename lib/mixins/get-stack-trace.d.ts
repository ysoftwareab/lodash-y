import { CallSite } from '../types';
/**
 * Part of `lodash-firecloud`.
 *
 * Gets the current stacktrace.
 *
 * @param level The maximum stacktrace length.
 * @returns Returns a structured stacktrace, that is a list of CallSite objects.
 */
export declare let getStackTrace: (level?: number) => CallSite[];
