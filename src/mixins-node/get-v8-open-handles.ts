import _ from 'lodash';
import asyncHooks from 'async_hooks';

import {
  getStackTrace
} from '../mixins/get-stack-trace';

export interface V8OpenHandle {
  time: number;
  asyncId: number;
  triggerAsyncId: number;
  resource: object;
  executionAsyncId: number;
  stackTrace: NodeJS.CallSite[];
}

let _openHandles: Map<V8OpenHandle['asyncId'], V8OpenHandle>;

let _init = function(): asyncHooks.AsyncHook {
  _openHandles = new Map();
  let hook = asyncHooks.createHook({
    // eslint-disable-next-line max-params
    init: function(asyncId, type, triggerAsyncId, resource) {
      let executionAsyncId = asyncHooks.executionAsyncId();
      let stackTrace = getStackTrace();

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
 * Part of `lodash-y`.
 *
 * Gets info about the V8 open handles.
 *
 * @param options Options.
 * @param [options.skipFiles] RegExps to test against when removing call sites.
 *   By default a RegExp for internal filenames is provided.
 * @returns Returns a list of V8 open handles.
 */
export let getV8OpenHandles = _.assign(function(options: {
  skipFiles?: RegExp[];
} = {}): V8OpenHandle[] {
  _.defaults(options, {
    skipFiles: [
      /^internal\//
    ]
  });

  if (_.isUndefined(getV8OpenHandles.hook)) {
    getV8OpenHandles.hook = _init();
  }

  let v8OpenHandles = [
    ..._openHandles.values()
  ];

  for (let handle of v8OpenHandles) {
    for (let skipFile of options.skipFiles) {
      handle.stackTrace = _.filter(handle.stackTrace, function(callSite) {
        let fileName = callSite.getFileName();
        if (!_.isUndefined(fileName) && skipFile.test(fileName)) {
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

        entry.stackTrace = _.map(entry.stackTrace, function(callSite: NodeJS.CallSite) {
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
            getPromiseIndex: callSite.getPromiseIndex()
          };

          if (callSite.isEval()) {
            let matched = /\((.*):(\d*):(\d*)\)/.exec(callSite.getEvalOrigin());
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
}, {
  hook: undefined
});
