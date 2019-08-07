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

      _openHandles.set(asyncId, {
        time: Date.now(), // not `new Date()` for performance reasons
        asyncId,
        type,
        triggerAsyncId,
        resource,
        executionAsyncId,
        stackTrace
      });
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

export let getV8OpenHandles = function(cfg = {}) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  cfg = _.defaults(cfg, {
    skipFiles: [
      /^internal\//
    ]
  });

  _asyncHooks = _.attempt(function() {
    // eslint-disable-next-line global-require
    return require('async_hooks');
  });

  if (_.isError(_asyncHooks)) {
    throw _asyncHooks;
  }

  if (_.isUndefined(getV8OpenHandles.hook)) {
    getV8OpenHandles.hook = _init(_);
  }

  let v8OpenHandles = [
    ..._openHandles.values()
  ];

  for (let handle of v8OpenHandles) {
    for (let skipFile of cfg.skipFiles) {
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

        handleLines = _.join(handleLines, '\n');
        lines.push(handleLines);
      }

      lines = _.join(lines, '\n\n');

      return lines;
    }
  });

  return v8OpenHandles;
};
