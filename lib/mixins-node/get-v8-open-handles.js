"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getV8OpenHandles = exports._init = exports._openHandles = void 0;var _lodash = _interopRequireDefault(require("lodash"));
var _async_hooks = _interopRequireDefault(require("async_hooks"));

var _getStackTrace = require("../mixins/get-stack-trace");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}












let _openHandles;exports._openHandles = _openHandles;

let _init = function () {
  exports._openHandles = _openHandles = new Map();
  let hook = _async_hooks.default.createHook({
    // eslint-disable-next-line max-params
    init: function (asyncId, type, triggerAsyncId, resource) {
      let executionAsyncId = _async_hooks.default.executionAsyncId();
      let stackTrace = (0, _getStackTrace.getStackTrace)();

      // ignore ourselves
      stackTrace.shift();

      let openHandle = {
        time: Date.now(), // not `new Date()` for performance reasons
        asyncId,
        type,
        triggerAsyncId,
        resource,
        executionAsyncId,
        stackTrace };

      exports._openHandles.set(asyncId, openHandle);
    },

    destroy: function (asyncId) {
      if (!exports._openHandles.has(asyncId)) {
        return;
      }

      exports._openHandles.delete(asyncId);
    } });


  hook.enable();

  return hook;
};

/**
    * Part of `lodash-firecloud`.
    *
    * Gets info about the V8 open handles.
    *
    * @param options Options.
    * @param [options.skipFiles] RegExps to test against when removing call sites.
    *   By default a RegExp for internal filenames is provided.
    * @returns Returns a list of V8 open handles.
    */exports._init = _init;
let getV8OpenHandles = _lodash.default.assign(function (options =

{}) {
  _lodash.default.defaults(options, {
    skipFiles: [
    /^internal\//] });



  if (_lodash.default.isUndefined(getV8OpenHandles.hook)) {
    getV8OpenHandles.hook = exports._init();
  }

  let v8OpenHandles = [
  ...exports._openHandles.values()];


  for (let handle of v8OpenHandles) {
    for (let skipFile of options.skipFiles) {
      handle.stackTrace = _lodash.default.filter(handle.stackTrace, function (callSite) {
        let fileName = callSite.getFileName();
        if (!_lodash.default.isUndefined(fileName) && skipFile.test(fileName)) {
          return false;
        }
        return true;
      });
    }
  }

  Object.defineProperty(v8OpenHandles, 'toJSON', {
    configurable: true,
    enumerable: false,
    writable: false,

    value: function () {
      let entries = [];
      for (let handle of this) {
        let entry = _lodash.default.omit(handle, [
        'resource']);


        entry.stackTrace = _lodash.default.map(entry.stackTrace, function (callSite) {
          let staticCallSite = {
            _toString: callSite.toString(),

            // this: callSite.getThis(),
            typeName: callSite.getTypeName(),
            // function: callSite.getFunction(),
            functionName: callSite.getFunctionName(),
            methodName: callSite.getMethodName(),
            fileName: callSite.getFileName(),
            lineNumber: callSite.getLineNumber(),
            getColumnNumber: callSite.getColumnNumber(),
            getEvalOrigin: callSite.getEvalOrigin(),
            isToplevel: callSite.isToplevel(),
            isEval: callSite.isEval(),
            isNative: callSite.isNative(),
            isConstructor: callSite.isConstructor(),
            // @ts-ignore
            isAsync: callSite.isAsync(),
            // @ts-ignore
            isPromiseAll: callSite.isPromiseAll(),
            // @ts-ignore
            getPromiseIndex: callSite.getPromiseIndex() };


          if (callSite.isEval()) {
            let matched = /\((.*):(\d*):(\d*)\)/.exec(callSite.getEvalOrigin());
            _lodash.default.merge(staticCallSite, {
              functionName: '<eval>',
              fileName: matched[1],
              lineNumber: matched[2] });

          }

          return staticCallSite;
        });

        entries.push(entry);
      }

      return entries;
    } });


  Object.defineProperty(v8OpenHandles, 'toString', {
    configurable: true,
    enumerable: false,
    writable: false,

    value: function () {
      let lines = [];
      for (let handle of this) {
        let handleLines = [];
        handleLines.push(new Date(handle.time).toISOString());
        handleLines.push(_lodash.default.join([
        `${handle.type}(${handle.asyncId}):`,
        `trigger: ${handle.triggerAsyncId},`,
        `execution: ${handle.executionAsyncId}`],
        ' '));

        for (let callSite of handle.stackTrace) {
          handleLines.push(`  at ${callSite.toString()}`);
        }

        let joinedHandleLines = _lodash.default.join(handleLines, '\n');
        lines.push(joinedHandleLines);
      }

      let joinedLines = _lodash.default.join(lines, '\n\n');

      return joinedLines;
    } });


  return v8OpenHandles;
}, {
  hook: undefined });exports.getV8OpenHandles = getV8OpenHandles;

//# sourceMappingURL=get-v8-open-handles.js.map