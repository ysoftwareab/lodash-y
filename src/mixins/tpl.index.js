#!/usr/bin/env node-esm

import _ from 'lodash';
import fs from 'fs';
import outdent from 'outdent';
import path from 'path';

let _mixinFiles = fs.readdirSync(__dirname);

let _mixinData = _.reduce(_mixinFiles, function(acc, mixinFile) {
  if (path.extname(mixinFile) !== '.ts') {
    return acc;
  }

  if (_.includes([
    'index.ts'
  ], mixinFile)) {
    return acc;
  }

  mixinFile = `./${mixinFile}`;

  acc[mixinFile] = true;
  return acc;
}, {});

let _tpl = _.template(outdent`
  <% _.forEach(_mixinData, function(mixins, mixinFile) { %>
  export * from '<%= _.replace(mixinFile, /\.ts$/, '') %>';
  <% }) %>
`);

// eslint-disable-next-line no-console
console.log(_tpl({
  _mixinData
}));
