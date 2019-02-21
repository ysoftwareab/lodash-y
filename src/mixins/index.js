// This module run at compile-time and produce a map of mixinVarName to mixinModule.
// This allows for new mixins to be added just by placing a new module under the `mixins` folder.
// Have a look at `src/index.js` for how this module's exports are used.

// @preval
let _ = require('lodash');
let fs = require('fs');
let path = require('path');

let mixinModules = fs.readdirSync(path.join(__dirname));
module.exports = _.reduce(mixinModules, function(acc, mixinModule) {
  if (path.extname(mixinModule) !== '.js') {
    return acc;
  }

  if (mixinModule === 'index.js') {
    return acc;
  }

  acc[_.camelCase(path.basename(mixinModule, '.js'))] = mixinModule;
  return acc;
}, {});
