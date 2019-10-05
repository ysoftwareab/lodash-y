#!/usr/bin/env node-esm
"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports._tpl = exports._mixinData = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _fs = _interopRequireDefault(require("fs"));
var _outdent = _interopRequireDefault(require("outdent"));
var _path = _interopRequireDefault(require("path"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

let _mixinData = _fs.default.readdirSync(__dirname);exports._mixinData = _mixinData;
exports._mixinData = _mixinData = _lodash.default.reduce(exports._mixinData, function (acc, mixinModule) {
  if (_path.default.extname(mixinModule) !== '.js') {
    return acc;
  }

  if (_lodash.default.includes([
  '.eslintrc.js',
  'index.js',
  'tpl.index.js'],
  mixinModule)) {
    return acc;
  }

  mixinModule = `./${mixinModule}`;

  // eslint-disable-next-line global-require
  let mixins = require(mixinModule);

  mixins = _lodash.default.omit(mixins, [
  'default']);


  acc = _lodash.default.merge(acc, {
    [mixinModule]: _lodash.default.keys(mixins) });

  return acc;
}, {});

let _tpl = _lodash.default.template(_outdent.default`
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
exports._tpl = _tpl;console.log(exports._tpl({
  _mixinData: exports._mixinData }));

//# sourceMappingURL=tpl.index.js.map