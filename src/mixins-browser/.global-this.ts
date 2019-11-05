// from https://mathiasbynens.be/notes/globalthis
// and yes... "Don't use this!"

/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
// -----------------------------------------------------------------------------

// A naive globalThis shim. Don’t use this!
const getGlobalThis = () => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  // if (typeof global !== 'undefined') return global;
  // if (typeof this !== 'undefined') return this;
  throw new Error('Unable to locate global `this`');
};
// Note: `var` is used instead of `const` to ensure `globalThis`
// becomes a global variable (as opposed to a variable in the
// top-level lexical scope) when running in the global scope.

var globalThis = getGlobalThis();

// -----------------------------------------------------------------------------
/* eslint-enable */

// eslint-disable-next-line import/no-default-export
export default globalThis as {
  CustomEvent: (typeof window)['CustomEvent'],
  IntersectionObserver: (typeof window)['IntersectionObserver'],
  MutationObserver: (typeof window)['MutationObserver'],
  ResizeObserver: (typeof window)['ResizeObserver']
};
