"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.abstract = void 0;let abstract = function (name = 'it') {
  return function () {
    throw new Error(`Calling an abstract function. Please implement ${name}.`);
  };
};exports.abstract = abstract;var _default = exports.abstract;exports.default = _default;

//# sourceMappingURL=abstract.js.map