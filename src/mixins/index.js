// This module run at compile-time and produce a map of mixinVarName to mixinModule.
// This allows for new mixins to be added just by placing a new module under the `mixins` folder.
// Have a look at `src/index.js` for how this module's exports are used.

// @preval

// eslint-disable-next-line import/no-unassigned-import
require('@babel/register');

let _ = require('lodash');
let fs = require('fs');
let path = require('path');

let mixinModules = fs.readdirSync(path.join(__dirname));
module.exports = _.reduce(mixinModules, function(acc, mixinModule) {
  if (path.extname(mixinModule) !== '.js') {
    return acc;
  }

  if (mixinModule === '.eslintrc.js') {
    return acc;
  }

  if (mixinModule === 'index.js') {
    return acc;
  }

  // eslint-disable-next-line global-require
  mixinModule = require(`./${mixinModule}`);

  let mixins = _.omit(mixinModule, [
    'default'
  ]);

  acc = _.merge(acc, mixins);
  return acc;
}, {});
