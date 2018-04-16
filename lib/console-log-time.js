"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.consoleLogTime = undefined;

var _bluebird = require("bluebird/js/release/bluebird");

let consoleLogTime = exports.consoleLogTime = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (label, fn) {
    // eslint-disable-next-line consistent-this, no-invalid-this
    let _ = this;

    // eslint-disable-next-line no-console
    console.log(label);

    // eslint-disable-next-line no-console
    console.time(label);

    let maybeThenable = fn();
    if (_.isFunction(maybeThenable.then)) {
      yield maybeThenable;
    }

    // eslint-disable-next-line no-console
    console.timeEnd(label);
  });

  return function consoleLogTime(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = exports.consoleLogTime;

//# sourceMappingURL=console-log-time.js.map