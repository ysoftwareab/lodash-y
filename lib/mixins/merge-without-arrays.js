"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mergeWithoutArrays = void 0;var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                      * Part of `lodash-firecloud`.
                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                      * Same as _.merge but don't merge arrays. Just override them.
                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                      * @param object The destination object.
                                                                                                                                                                                                                                                                      * @param sources The source objects.
                                                                                                                                                                                                                                                                      * @returns Returns object.
                                                                                                                                                                                                                                                                      */
let mergeWithoutArrays = function (object, ...sources) {
  return _lodash.default.mergeWith(object, ...sources, function (_objValue, srcValue) {
    // treat arrays as primitives, don't deep merge
    if (_lodash.default.isArray(srcValue)) {
      return srcValue;
    }
  });
};exports.mergeWithoutArrays = mergeWithoutArrays;

//# sourceMappingURL=merge-without-arrays.js.map