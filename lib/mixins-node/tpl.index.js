#!/usr/bin/env node-esm
"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports._tpl = exports._mixinData = exports._mixinFiles = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _fs = _interopRequireDefault(require("fs"));
var _outdent = _interopRequireDefault(require("outdent"));
var _path = _interopRequireDefault(require("path"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

let _mixinFiles = _fs.default.readdirSync(__dirname);exports._mixinFiles = _mixinFiles;

let _mixinData = _lodash.default.reduce(exports._mixinFiles, function (acc, mixinFile) {
  if (_path.default.extname(mixinFile) !== '.ts') {
    return acc;
  }

  if (_lodash.default.includes([
  'index.ts'],
  mixinFile)) {
    return acc;
  }

  mixinFile = `./${mixinFile}`;

  acc[mixinFile] = true;
  return acc;
}, {});exports._mixinData = _mixinData;

let _tpl = _lodash.default.template((0, _outdent.default)`
  <% _.forEach(_mixinData, function(mixins, mixinFile) { %>
  export * from '<%= _.replace(mixinFile, /\.ts$/, '') %>';
  <% }) %>
`);

// eslint-disable-next-line no-console
exports._tpl = _tpl;console.log(exports._tpl({
  _mixinData: exports._mixinData }));

//# sourceMappingURL=tpl.index.js.map