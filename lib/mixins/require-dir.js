"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.requireDir = void 0;let requireDir = function (dir, filter = [
'.js',
'.json',
'.node'])
{
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  if (_.isArray(filter)) {
    let requireExtensions = filter;
    filter = function (filename) {
      return _.includes(requireExtensions, path.extname(filename));
    };
  } else if (_.isFunction(filter)) {
    // noop
  } else {
    throw new Error(`Unknown type for requireExtensions '${typeof requireExtensions}.'`);
  }

  // eval('require') is a trick for webpack to ignore bundling the module
  // eslint-disable-next-line no-eval
  let req = eval('require');

  let fs = req('fs');
  let path = req('path');

  let files = fs.readdirSync(dir);

  files = _.filter(files, filter);

  files = _.sortBy(files);

  files = _.map(files, function (file) {
    return path.join(dir, file);
  });

  let modules = _.map(files, function (file) {
    let getProps = req(file);
    return getProps;
  });

  return modules;
};exports.requireDir = requireDir;

//# sourceMappingURL=require-dir.js.map