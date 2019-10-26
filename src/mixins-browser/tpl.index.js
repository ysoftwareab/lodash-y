#!/usr/bin/env node-esm

import _ from 'lodash';
import fs from 'fs';
import outdent from 'outdent';
import path from 'path';

let _mixinFiles = fs.readdirSync(__dirname);

let _mixinData = _.reduce(_mixinFiles, function(acc, mixinModule) {
  if (path.extname(mixinModule) !== '.js') {
    return acc;
  }

  if (_.includes([
    '.eslintrc.js',
    'index.js',
    'tpl.index.js'
  ], mixinModule)) {
    return acc;
  }

  mixinModule = `./${mixinModule}`;

  // eslint-disable-next-line global-require
  let mixins = require(mixinModule);

  mixins = _.omit(mixins, [
    'default'
  ]);

  acc = _.merge(acc, {
    [mixinModule]: _.keys(mixins)
  });
  return acc;
}, {});

let _tpl = _.template(outdent`
  <% _.forEach(_mixinData, function(mixins, mixinModule) { %>
  import {
    <%= _.join(mixins, ',\\n  ') %>
  } from '<%= _.replace(mixinModule, /\.js$/, '') %>';
  <% }) %>

  // eslint-disable-next-line import/no-default-export
  export default {
    <%= _.join(_.flatten(_.values(_mixinData)), ',\\n  ') %>
  };
`);

// eslint-disable-next-line no-console
console.log(_tpl({
  _mixinData
}));