"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.requireDir = void 0;var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                              * Part of `lodash-firecloud`.
                                                                                                                                                                                                                                                              *
                                                                                                                                                                                                                                                              * Require all Node.js modules in a directory.
                                                                                                                                                                                                                                                              *
                                                                                                                                                                                                                                                              * @param dir The directory.
                                                                                                                                                                                                                                                              * @param filter The allowed extensions for 'require' or a filtering function.
                                                                                                                                                                                                                                                              * @returns Returns an array of required modules.
                                                                                                                                                                                                                                                              */
let requireDir = function (dir, filter = [
'.js',
'.json',
'.node'])
{
  if (_lodash.default.isArray(filter)) {
    let requireExtensions = filter;
    filter = function (filename) {
      return _lodash.default.includes(requireExtensions, path.extname(filename));
    };
  } else if (_lodash.default.isRegExp(filter)) {
    let re = filter;
    filter = function (filename) {
      return re.test(filename);
    };
  } else if (_lodash.default.isFunction(filter)) {
    // noop
  } else {
    throw new Error(`Unknown type for filter '${typeof filter}.'`);
  }

  // eval('require') is a trick for webpack to ignore bundling the module
  // eslint-disable-next-line no-eval
  let req = eval('require');

  let fs = req('fs');
  let path = req('path');

  let files = fs.readdirSync(dir);

  files = _lodash.default.filter(files, filter);

  files = _lodash.default.sortBy(files);

  files = _lodash.default.map(files, function (file) {
    return path.join(dir, file);
  });

  let modules = _lodash.default.map(files, function (file) {
    let getProps = req(file);
    return getProps;
  });

  return modules;
};exports.requireDir = requireDir;

//# sourceMappingURL=require-dir.js.map