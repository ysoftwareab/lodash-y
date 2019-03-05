#!/usr/bin/env babel-node

import _ from 'lodash';
import fs from 'fs';
import outdent from 'outdent';
import path from 'path';

let _mixinData = fs.readdirSync(__dirname);
_mixinData = _.reduce(_mixinData, function(acc, mixinModule) {
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
  } from '<%= mixinModule %>';
  <% }) %>
  export default {
    <%= _.join(_.flatten(_.values(_mixinData)), ',\\n  ') %>
  };
`);

// eslint-disable-next-line no-console
console.log(_tpl({
  _mixinData
}));
