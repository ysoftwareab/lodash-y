"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getStackTrace = void 0;var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                 * Part of `lodash-firecloud`.
                                                                                                                                                                                                                                                                 *
                                                                                                                                                                                                                                                                 * Gets the current stacktrace.
                                                                                                                                                                                                                                                                 *
                                                                                                                                                                                                                                                                 * @param level The maximum stacktrace length.
                                                                                                                                                                                                                                                                 * @returns Returns a structured stacktrace, that is a list of CallSite objects.
                                                                                                                                                                                                                                                                 */
let getStackTrace = function (level = Infinity) {
  let {
    prepareStackTrace,
    stackTraceLimit } =
  Error;

  let structuredStackTrace = [];
  Error.stackTraceLimit = level + 1;
  Error.prepareStackTrace = function (err, structuredStackTrace2) {
    structuredStackTrace = [
    ...structuredStackTrace2];

    // ignore ourselves
    structuredStackTrace.shift();

    if (_lodash.default.isFunction(prepareStackTrace)) {
      return prepareStackTrace.call(Error, err, structuredStackTrace2);
    }
  };
  // eslint-disable-next-line babel/no-unused-expressions
  Error().stack;
  Error.stackTraceLimit = stackTraceLimit;
  Error.prepareStackTrace = prepareStackTrace;

  return structuredStackTrace;
};exports.getStackTrace = getStackTrace;

//# sourceMappingURL=get-stack-trace.js.map