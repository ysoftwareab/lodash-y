#!/usr/bin/env node-esm

import * as babelParser from '@babel/parser';
import _ from 'lodash';
import fs from 'fs';
import outdent from 'outdent';
import path from 'path';

let _mixinFiles = fs.readdirSync(__dirname);

let _mixinData = _.reduce(_mixinFiles, function(acc, mixinFile) {
  if (path.extname(mixinFile) !== '.js') {
    return acc;
  }

  if (_.includes([
    '.eslintrc.js',
    'index.js',
    'tpl.index.js'
  ], mixinFile)) {
    return acc;
  }

  mixinFile = `./${mixinFile}`;

  let ast = babelParser.parse(fs.readFileSync(`${__dirname}/${mixinFile}`, 'utf8'), {
    sourceType: 'module',
    plugins: [
      'classProperties'
    ]
  });

  /** @typedef {import('@babel/types').ExportNamedDeclaration} ExportNamedDeclaration */
  let exportNamedDeclarations = /** @type {ExportNamedDeclaration[]} */ (_.filter(ast.program.body, {
    type: 'ExportNamedDeclaration'
  }));

  let namedExports = _.map(exportNamedDeclarations, function(exportNamedDeclaration) {
    switch (exportNamedDeclaration.declaration.type) {
    case 'VariableDeclaration':
      // @ts-ignore
      return exportNamedDeclaration.declaration.declarations[0].id.name;
    case 'ClassDeclaration':
      return exportNamedDeclaration.declaration.id.name;
    case 'FunctionDeclaration':
      return exportNamedDeclaration.declaration.id.name;
    default:
      throw new Error(`Unknown export of type ${exportNamedDeclaration.declaration.type}.`);
    }
  });

  acc = _.merge(acc, {
    [mixinFile]: namedExports
  });
  return acc;
}, {});

let _tpl = _.template(outdent`
  <% _.forEach(_mixinData, function(mixins, mixinFile) { %>
  import {
    <%= _.join(mixins, ',\\n  ') %>
  } from '<%= _.replace(mixinFile, /\.js$/, '') %>';
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
