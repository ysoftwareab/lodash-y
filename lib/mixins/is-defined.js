"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.isDefined = void 0;var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                             * Part of `lodash-firecloud`.
                                                                                                                                                                                                                                                             *
                                                                                                                                                                                                                                                             * Checks if value is defined.
                                                                                                                                                                                                                                                             *
                                                                                                                                                                                                                                                             * @param value The value to check.
                                                                                                                                                                                                                                                             * @returns Returns true if value is defined, else false.
                                                                                                                                                                                                                                                             */
let isDefined = function (value) {
  return !_lodash.default.isUndefined(value);
};exports.isDefined = isDefined;

//# sourceMappingURL=is-defined.js.map