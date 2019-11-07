"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.onceIn = void 0;var _throttleTrue = require("./throttle-true");



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
let onceIn = _throttleTrue.throttleTrue;exports.onceIn = onceIn;

//# sourceMappingURL=once-in.js.map