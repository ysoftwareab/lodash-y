"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getV8OpenHandles = exports._init = exports._openHandles = exports._asyncHooks = void 0;let _asyncHooks;exports._asyncHooks = _asyncHooks;
let _openHandles;exports._openHandles = _openHandles;

let _init = function (_) {
  exports._openHandles = _openHandles = new Map();
  let hook = exports._asyncHooks.createHook({
    // eslint-disable-next-line max-params
    init: function (asyncId, type, triggerAsyncId, resource) {
      let executionAsyncId = exports._asyncHooks.executionAsyncId();
      let stackTrace = _.getStackTrace();

      // ignore ourselves
      stackTrace.shift();

      exports._openHandles.set(asyncId, {
        time: Date.now(), // not `new Date()` for performance reasons
        asyncId,
        type,
        triggerAsyncId,
        resource,
        executionAsyncId,
        stackTrace });

    },

    destroy: function (asyncId) {
      if (!exports._openHandles.has(asyncId)) {
        return;
      }

      exports._openHandles.delete(asyncId);
    } });


  hook.enable();

  return hook;
};exports._init = _init;

let getV8OpenHandles = function (cfg = {}) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  cfg = _.defaults(cfg, {
    skipFiles: [
    /^internal\//] });



  exports._asyncHooks = _asyncHooks = _.attempt(function () {
    // eval is a trick for webpack to ignore require
    // see https://stackoverflow.com/questions/34828722/how-can-i-make-webpack-skip-a-require
    // eslint-disable-next-line no-eval
    return eval('require')('async_hooks');
  });

  if (_.isError(exports._asyncHooks)) {
    throw exports._asyncHooks;
  }

  if (_.isUndefined(getV8OpenHandles.hook)) {
    getV8OpenHandles.hook = exports._init(_);
  }

  let v8OpenHandles = [
  ...exports._openHandles.values()];


  for (let handle of v8OpenHandles) {
    for (let skipFile of cfg.skipFiles) {
      handle.stackTrace = _.filter(handle.stackTrace, function (callSite) {
        let fileName = callSite.getFileName();
        if (_.isDefined(fileName) && skipFile.test(fileName)) {
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
        let entry = _.omit(handle, [
        'resource']);


        entry.stackTrace = _.map(entry.stackTrace, function (callSite) {
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
            isAsync: callSite.isAsync(),
            isPromiseAll: callSite.isPromiseAll(),
            getPromiseIndex: callSite.getPromiseIndex() };


          if (callSite.isEval()) {
            let matched = callSite.getEvalOrigin().match(/\((.*):(\d*):(\d*)\)/) || {};
            _.merge(staticCallSite, {
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
        handleLines.push(_.join([
        `${handle.type}(${handle.asyncId}):`,
        `trigger: ${handle.triggerAsyncId},`,
        `execution: ${handle.executionAsyncId}`],
        ' '));

        for (let callSite of handle.stackTrace) {
          handleLines.push(`  at ${callSite.toString()}`);
        }

        handleLines = _.join(handleLines, '\n');
        lines.push(handleLines);
      }

      lines = _.join(lines, '\n\n');

      return lines;
    } });


  return v8OpenHandles;
};exports.getV8OpenHandles = getV8OpenHandles;

//# sourceMappingURL=get-v8-open-handles.js.map