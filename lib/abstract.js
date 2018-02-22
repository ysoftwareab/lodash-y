'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
let abstract = exports.abstract = function (name = 'it') {
  return function () {
    throw new Error(`Calling an abstract function. Please implement ${name}.`);
  };
};

exports.default = abstract;

//# sourceMappingURL=abstract.js.map