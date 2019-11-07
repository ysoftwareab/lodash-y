"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.abstract = void 0;



/**
                                                                                                       * Part of `lodash-firecloud`.
                                                                                                       *
                                                                                                       * Create a stub function that throws an error when invoked. Supposed to be overriden.
                                                                                                       *
                                                                                                       * @param [name='it'] Name of the method to be abstracted.
                                                                                                       * @returns Returns a function that throws error when invoked.
                                                                                                       */
let abstract = function (name = 'it') {
  return function () {
    throw new Error(`Calling an abstract function. Please implement ${name}.`);
  };
};exports.abstract = abstract;

//# sourceMappingURL=abstract.js.map