"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.abstract = void 0;let abstract = function (name = 'it') {
  return function () {
    throw new Error(`Calling an abstract function. Please implement ${name}.`);
  };
};exports.abstract = abstract;

//# sourceMappingURL=abstract.js.map