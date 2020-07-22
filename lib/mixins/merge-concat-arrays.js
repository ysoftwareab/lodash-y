"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mergeConcatArrays = void 0;var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                     * Part of `lodash-firecloud`.
                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                     * Same as _.merge but don't merge arrays. Just concat them.
                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                     * @param object The destination object.
                                                                                                                                                                                                                                                                     * @param sources The source objects.
                                                                                                                                                                                                                                                                     * @returns Returns object.
                                                                                                                                                                                                                                                                     */
let mergeConcatArrays = function (object, ...sources) {
  return _lodash.default.mergeWith(object, ...sources, function (objValue, srcValue) {
    // treat arrays as concat-merge, don't deep merge by index
    if (_lodash.default.isArray(objValue) && _lodash.default.isArray(srcValue)) {
      return [
      ...objValue,
      ...srcValue];

    }
  });
};exports.mergeConcatArrays = mergeConcatArrays;

//# sourceMappingURL=merge-concat-arrays.js.map