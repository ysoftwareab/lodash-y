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
