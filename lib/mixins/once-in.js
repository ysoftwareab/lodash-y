"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.onceIn = void 0;let onceIn = function (...args) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  return _.throttleTrue(...args);
};exports.onceIn = onceIn;

//# sourceMappingURL=once-in.js.map