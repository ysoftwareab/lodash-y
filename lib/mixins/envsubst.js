"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.envsubst = void 0;var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                            * Part of `lodash-firecloud`.
                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                            * Substitute environment variables á la envsubst.
                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                            * @param text The textual source.
                                                                                                                                                                                                                                                            * @param env Dictionary of environment variables.
                                                                                                                                                                                                                                                            * @returns Returns .
                                                                                                                                                                                                                                                            */
let envsubst = function (text, env) {
  let result = _lodash.default.replace(text, /\$\{?(\w+)\}?/g, function (match, key) {
    return _lodash.default.defaultTo(env[key], match);
  });
  return result;
};exports.envsubst = envsubst;

//# sourceMappingURL=envsubst.js.map