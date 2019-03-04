// This module run at compile-time and produce a map of mixinVarName to mixinModule.
// This allows for new mixins to be added just by placing a new module under the `mixins` folder.
// Have a look at `src/index.js` for how this module's exports are used.

// this file was prevaled

// eslint-disable-next-line import/no-unassigned-import
module.exports = { "abstract": function (name = 'it') {return function () {throw new Error(`Calling an abstract function. Please implement ${name}.`);};}, "alwaysPromise": function (maybePromiseLike) {// eslint-disable-next-line consistent-this, no-invalid-this
    let _ = this;return Promise.resolve(maybePromiseLike);}, "base64": function (string) {


    // eslint-disable-next-line consistent-this, no-invalid-this
    let _ = this;let result = Buffer.from(string).toString('base64');result = _.replace(result, /=+$/, '');return result;}, "callbackify": function (origFn, { callbackFirst = false, errorInCallback = true, keepCallback = false } = {}) {









    // eslint-disable-next-line consistent-this, no-invalid-this
    let _ = this;let fn = function (...args) {let origCallback;if (callbackFirst) {origCallback = _.head(args);if (!keepCallback) {args.shift();}} else {origCallback = _.last(args);if (!keepCallback) {args.pop();}}let callback = (...args) => {















        // eslint-disable-next-line no-invalid-this
        Reflect.apply(origCallback, this, args);
        // origCallback(...args);
      };let onFullfilled = function (result) {if (errorInCallback) {setTimeout(callback, 0, undefined, result);} else {setTimeout(callback, 0, result);}};let onRejected = function (err) {if (errorInCallback) {setTimeout(callback, 0, err);} else {setTimeout(callback, 0);}};

















      // eslint-disable-next-line no-invalid-this
      Reflect.apply(origFn, this, args).then(onFullfilled, onRejected);
      // origFn(...args).then(onFullfilled, onRejected);
    };Object.setPrototypeOf(fn, Object.getPrototypeOf(origFn));Object.defineProperties(fn, Object.getOwnPropertyDescriptors(origFn));return fn;}, "consoleLogTime": async function (label, fn) {






    // eslint-disable-next-line consistent-this, no-invalid-this
    let _ = this;

    // eslint-disable-next-line no-console
    console.log(label);

    // eslint-disable-next-line no-console
    console.time(label);let returnValue = await _.alwaysPromise(fn());



    // eslint-disable-next-line no-console
    console.timeEnd(label);return returnValue;}, "mapValuesDeep": function (fn) {


    // eslint-disable-next-line consistent-this, no-invalid-this
    let _ = this;return function (obj, ...args) {return fn(_.mapValues(obj, function (v) {return _.isPlainObject(v) ? _.mapValuesDeep(fn)(v, ...args) : v;}), ...args);};}, "naiveChecksum": function (str) {







    // eslint-disable-next-line consistent-this, no-invalid-this
    let _ = this;let checksums = [];let checksum = 0;_.forEach(str, function (_char, index) {let charChecksum = str.charCodeAt(index) * (index + 1);if (!Number.isSafeInteger(checksum + charChecksum)) {checksums.push(checksum);checksum = 0;}checksum = checksum + charChecksum;});checksums.push(checksum);checksums = _.map(checksums, function (checksum) {return checksum.toString(16);});checksums = _.join(checksums, '');return checksums;}, "onceIn": function (fn, interval) {let lastInvokeTime = 0;let lastInvokeResult;let toInvoke = function (...args) {let now = Date.now();if (now - lastInvokeTime < interval) {return lastInvokeResult;}lastInvokeTime = now;lastInvokeResult = fn(...args);return lastInvokeResult;};


































    // special case for direct call
    if (interval === 0) {toInvoke = function (...args) {return fn(...args);};}





    // _.throttle consistency
    toInvoke.flush = function () {lastInvokeTime = 0;};toInvoke.clear = toInvoke.flush;return toInvoke;}, "outdent": function outdent(stringsOrOptions) {var values = [];for (var _i = 1; _i < arguments.length; _i++) {values[_i - 1] = arguments[_i];}










    /* tslint:enable:no-shadowed-variable */if (isTemplateStringsArray(stringsOrOptions)) {var strings = stringsOrOptions;


      // Is first interpolated value a reference to outdent, alone on its own line, without any preceding non-whitespace?
      var firstInterpolatedValueSetsIndentationLevel = (values[0] === outdent || values[0] === defaultOutdent) && reOnlyWhitespaceWithAtLeastOneNewline.test(strings[0]) && reStartsWithNewlineOrIsEmpty.test(strings[1]);


      // Perform outdentation
      var cache = firstInterpolatedValueSetsIndentationLevel ? arrayFirstInterpSetsIndentCache : arrayAutoIndentCache;var renderedArray = cache.get(strings);if (!renderedArray) {renderedArray = _outdentArray(strings, firstInterpolatedValueSetsIndentationLevel, options);cache.set(strings, renderedArray);}





      /** If no interpolated values, skip concatenation step */if (values.length === 0) {return renderedArray[0];}



      /** Concatenate string literals with interpolated values */var rendered = concatStringsAndValues(renderedArray, firstInterpolatedValueSetsIndentationLevel ? values.slice(1) : values);return rendered;} else {




      // Create and return a new instance of outdent with the given options
      return createInstance(extend(extend({}, options), stringsOrOptions || {}));}}, "promisify": function (origFn, { callbackFirst = false, errorInCallback = true } = {}) {let fn = function (...args) {return new Promise(function (resolve, reject) {let callback = function (...results) {if (errorInCallback) {let err = results.shift();if (err) {reject(err);return;}}switch (results.length) {case 0:resolve();break;case 1:resolve(results[0]);break;default:resolve(results);break;}};if (callbackFirst) {args.unshift(callback);} else {args.push(callback);}origFn(...args);});};Object.setPrototypeOf(fn, Object.getPrototypeOf(origFn));Object.defineProperties(fn, Object.getOwnPropertyDescriptors(origFn));return fn;}, "sleep": function (ms = 0) {













































    // eslint-disable-next-line consistent-this, no-invalid-this
    let _ = this;return new Promise(function (resolve, _reject) {_.delay(resolve, ms);});}, "unbase64": function (string) {let result = Buffer.from(string, 'base64').toString();return result;} };

//# sourceMappingURL=index.js.map