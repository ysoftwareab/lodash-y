// NOTE global.require is a trick for webpack to ignore bundling the module

let _asyncHooks;
let _openHandles;

let _init = function(_) {
  _openHandles = new Map();
  let hook = _asyncHooks.createHook({
    // eslint-disable-next-line max-params
    init: function(asyncId, type, triggerAsyncId, resource) {
      let executionAsyncId = _asyncHooks.executionAsyncId();
      let stackTrace = _.getStackTrace();

      // ignore ourselves
      stackTrace.shift();

      let openHandle = {
        time: Date.now(), // not `new Date()` for performance reasons
        asyncId,
        type,
        triggerAsyncId,
        resource,
        executionAsyncId,
        stackTrace
      };
      _openHandles.set(asyncId, openHandle);
    },

    destroy: function(asyncId) {
      if (!_openHandles.has(asyncId)) {
        return;
      }

      _openHandles.delete(asyncId);
    }
  });

  hook.enable();

  return hook;
};

/**
 * @typedef {Object} V8OpenHandles
 * @property {number} time,
 * @property {number} asyncId
 * @property {number} triggerAsyncId
 * @property {Object} resource,
 * @property {number} executionAsyncId
 * @property {string[]} stackTrace
 */

/**
 * Part of `lodash-firecloud`.
 *
 * Gets info about the V8 open handles.
 *
 * @param {Object} args Named args.
 * @param {RegExp[]} [args.skipFiles] RegExps to test against when removing call sites.
 *   By default a RegExp for internal filenames is provided.
 * @returns {V8OpenHandles[]} Returns a list of V8 open handles.
 */
export let getV8OpenHandles = function(args = {}) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  args = _.defaults(args, {
    skipFiles: [
      /^internal\//
    ]
  });

  let {
    skipFiles
  } = args;

  // see https://github.com/lodash/lodash/blob/4ea8c2ec249be046a0f4ae32539d652194caf74f/.internal/freeGlobal.js
  // eslint-disable-next-line eqeqeq, no-null/no-null
  let freeGlobal = typeof global == 'object' && global !== null && global.Object === Object && global;

  // @ts-ignore
  _asyncHooks = freeGlobal.require('async_hooks');

  if (_.isUndefined(getV8OpenHandles.hook)) {
    getV8OpenHandles.hook = _init(_);
  }

  let v8OpenHandles = [
    ..._openHandles.values()
  ];

  for (let handle of v8OpenHandles) {
    for (let skipFile of skipFiles) {
      handle.stackTrace = _.filter(handle.stackTrace, function(callSite) {
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

    value: function() {
      let entries = [];
      for (let handle of this) {
        let entry = _.omit(handle, [
          'resource'
        ]);

        entry.stackTrace = _.map(entry.stackTrace, function(callSite) {
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
            getPromiseIndex: callSite.getPromiseIndex()
          };

          if (callSite.isEval()) {
            let matched = callSite.getEvalOrigin().match(/\((.*):(\d*):(\d*)\)/) || {};
            _.merge(staticCallSite, {
              functionName: '<eval>',
              fileName: matched[1],
              lineNumber: matched[2]
            });
          }

          return staticCallSite;
        });

        entries.push(entry);
      }

      return entries;
    }
  });

  Object.defineProperty(v8OpenHandles, 'toString', {
    configurable: true,
    enumerable: false,
    writable: false,

    value: function() {
      let lines = [];
      for (let handle of this) {
        let handleLines = [];
        handleLines.push(new Date(handle.time).toISOString());
        handleLines.push(_.join([
          `${handle.type}(${handle.asyncId}):`,
          `trigger: ${handle.triggerAsyncId},`,
          `execution: ${handle.executionAsyncId}`
        ], ' '));

        for (let callSite of handle.stackTrace) {
          handleLines.push(`  at ${callSite.toString()}`);
        }

        let joinedHandleLines = _.join(handleLines, '\n');
        lines.push(joinedHandleLines);
      }

      let joinedLines = _.join(lines, '\n\n');

      return joinedLines;
    }
  });

  return v8OpenHandles;
};

getV8OpenHandles.hook = undefined;
