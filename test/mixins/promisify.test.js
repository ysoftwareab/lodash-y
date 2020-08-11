/* eslint-disable jest/no-test-callback */
import _ from '../../src';

describe('promisify', function() {
  describe('resolves correctly', function() {
    it('with default options', async function() {
      let ok = Symbol('ok');
      let fn = function(next) {
        next(undefined, ok);
      };
      let fnPromise = _.promisify(fn);
      let fnArg = function(arg, next) {
        next(undefined, arg);
      };
      let fnArgPromise = _.promisify(fnArg);
      let fnMulti = function(arg, next) {
        next(undefined, arg, arg);
      };
      let fnMultiPromise = _.promisify(fnMulti);

      let promise = fnPromise();
      let argPromise = fnArgPromise(ok);
      let multiPromise = fnMultiPromise(ok);
      expect(await promise).toBe(ok);
      expect(await argPromise).toBe(ok);
      expect(await multiPromise).toStrictEqual([
        ok,
        ok
      ]);
    });

    it('with callbackFirst', async function() {
      let ok = Symbol('ok');
      let fn = function(next, arg) {
        next(undefined, arg);
      };
      let fnPromise = _.promisify(fn, {
        callbackFirst: true
      });
      let fnMulti = function(next, arg) {
        next(undefined, arg, arg);
      };
      let fnMultiPromise = _.promisify(fnMulti, {
        callbackFirst: true
      });

      let promise = fnPromise(ok);
      let multiPromise = fnMultiPromise(ok);
      expect(await promise).toBe(ok);
      expect(await multiPromise).toStrictEqual([
        ok,
        ok
      ]);
    });

    it('with no errorInCallback', async function() {
      let ok = Symbol('ok');
      let fn = function(arg, next) {
        next(arg);
      };
      let fnPromise = _.promisify(fn, {
        errorInCallback: false
      });
      let fnMulti = function(arg, next) {
        next(arg, arg);
      };
      let fnMultiPromise = _.promisify(fnMulti, {
        errorInCallback: false
      });

      let promise = fnPromise(ok);
      let multiPromise = fnMultiPromise(ok);
      expect(await promise).toBe(ok);
      expect(await multiPromise).toStrictEqual([
        ok,
        ok
      ]);
    });
  });

  describe('rejects correctly', function() {
    it('with default options', async function() {
      let err = new Error();
      let fn = function(next) {
        next(err);
      };
      let fnPromise = _.promisify(fn);
      let fnArg = function(_arg, next) {
        next(err);
      };
      let fnArgPromise = _.promisify(fnArg);

      let promise = fnPromise();
      let argPromise = fnArgPromise(err);
      await expect(promise).rejects.toBe(err);
      await expect(argPromise).rejects.toBe(err);
    });

    it('with callbackFirst', async function() {
      let err = new Error();
      let fn = function(next, _arg) {
        next(err);
      };
      let fnPromise = _.promisify(fn, {
        callbackFirst: true
      });

      let promise = fnPromise();
      await expect(promise).rejects.toBe(err);
    });
  });
});
