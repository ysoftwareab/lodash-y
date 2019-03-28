"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.consoleLogTime = void 0;let consoleLogTime = async function (label, fn) {
  // eslint-disable-next-line consistent-this, no-invalid-this
  let _ = this;

  // eslint-disable-next-line no-console
  console.log(label);

  // eslint-disable-next-line no-console
  console.time(label);

  let returnValue = await _.alwaysPromise(fn());

  // eslint-disable-next-line no-console
  console.timeEnd(label);
  return returnValue;
};exports.consoleLogTime = consoleLogTime;

//# sourceMappingURL=console-log-time.js.map