"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getStackTrace = void 0;let getStackTrace = function (level = Infinity) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

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

    if (_.isFunction(prepareStackTrace)) {
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