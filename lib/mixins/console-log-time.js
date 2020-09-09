"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.consoleLogTime = void 0;



/**
                                                                                                             * Part of `lodash-firecloud`.
                                                                                                             *
                                                                                                             * Log execution time of a function.
                                                                                                             *
                                                                                                             * @param label Label for current measurement, that will be displayed in the console.
                                                                                                             * @param fn A function to measure execution time of.
                                                                                                             * @returns Returns the return value of the function.
                                                                                                             */
let consoleLogTime = async function (
label,
fn)
{
  // eslint-disable-next-line no-console
  console.log(label);

  // eslint-disable-next-line no-console
  console.time(label);

  let returnValue = await (async createError => {try {return await fn();} catch (_awaitTraceErr) {let err = createError();_awaitTraceErr.stack += "\n...\n" + err.stack;throw _awaitTraceErr;}})(() => new Error());

  // eslint-disable-next-line no-console
  console.timeEnd(label);
  return returnValue;
};exports.consoleLogTime = consoleLogTime;

//# sourceMappingURL=console-log-time.js.map