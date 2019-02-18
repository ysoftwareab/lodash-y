// @preval
let _ = require('lodash');
let fs = require('fs');
let path = require('path');

let mixinDir = 'mixins';
let mixinModules = fs.readdirSync(path.join(__dirname, mixinDir));
module.exports = _.reduce(mixinModules, function(acc, mixinModule) {
  if (path.extname(mixinModule) !== '.js') {
    return acc;
  }

  // _.join and not path.join
  acc[_.camelCase(path.basename(mixinModule, '.js'))] = _.join([
    '.',
    mixinDir,
    mixinModule
  ], '/');
  return acc;
}, {});
