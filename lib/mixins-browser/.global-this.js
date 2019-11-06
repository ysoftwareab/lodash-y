"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.globalThis = exports.getGlobalThis = void 0; // from https://mathiasbynens.be/notes/globalthis
// and yes... "Don't use this!"

/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
// -----------------------------------------------------------------------------

// A naive globalThis shim. Don’t use this!
const getGlobalThis = () => {
  if (typeof exports.globalThis !== 'undefined') return exports.globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  // if (typeof global !== 'undefined') return global;
  // if (typeof this !== 'undefined') return this;
  throw new Error('Unable to locate global `this`');
};
// Note: `var` is used instead of `const` to ensure `globalThis`
// becomes a global variable (as opposed to a variable in the
// top-level lexical scope) when running in the global scope.
exports.getGlobalThis = getGlobalThis;
var globalThis = exports.getGlobalThis();

// -----------------------------------------------------------------------------
/* eslint-enable */

// eslint-disable-next-line import/no-default-export
exports.globalThis = globalThis;var _default = exports.globalThis;exports.default = _default;

//# sourceMappingURL=.global-this.js.map