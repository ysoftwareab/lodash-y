"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.requireDir = void 0; // NOTE global.require is a trick for webpack to ignore bundling the module

let requireDir = function (dir) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  // see https://github.com/lodash/lodash/blob/4ea8c2ec249be046a0f4ae32539d652194caf74f/.internal/freeGlobal.js
  // eslint-disable-next-line eqeqeq, no-null/no-null
  let freeGlobal = typeof global == 'object' && global !== null && global.Object === Object && global;

  if (!freeGlobal.require) {
    throw new Error('global.require seems to be undefined. NOTE requireDir is a Node.js-only mixin.');
  }

  let fs = freeGlobal.require('fs');
  let path = freeGlobal.require('path');

  let files = fs.readdirSync(dir);
  let requireExtensions = _.keys(freeGlobal.require.extensions);

  files = _.filter(files, function (file) {
    return _.includes(requireExtensions, path.extname(file));
  });

  files = _.map(files, function (file) {
    return path.join(dir, file);
  });

  let modules = _.map(files, function (file) {
    // eslint-disable-next-line global-require
    let getProps = freeGlobal.require(file);
    return getProps;
  });

  return modules;
};exports.requireDir = requireDir;

//# sourceMappingURL=require-dir.js.map