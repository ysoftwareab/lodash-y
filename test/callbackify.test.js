/* eslint-disable jest/no-test-callback */
import _ from '../src';

describe('callbackify', function() {
  it('calls next', function(done) {
    // eslint-disable-next-line no-empty-function
    let promise = async function() {};
    let cb = _.callbackify(promise);
    let next = function(err) {
      expect(err).toBeUndefined();
      done();
    };
    cb(next);
  });

  it('passes on arguments', function(done) {
    let next = function(_err, result) {
      expect(result).toBe(true);
      done();
    };
    let promise = async function(arg) {
      return arg;
    };
    let cb = _.callbackify(promise);
    cb(true, next);
  });

  it('passes on arguments with keepCallback:true', function(done) {
    let next = function(_err, result) {
      expect(result).toBe(true);
      done();
    };
    let promise = async function(arg, next2) {
      expect(next2).toBe(next);
      return arg;
    };
    let cb = _.callbackify(promise, {
      keepCallback: true
    });
    cb(true, next);
  });

  it('passes on arguments with errorInCallback:false', function(done) {
    let next = function(result) {
      expect(result).toBe(true);
      done();
    };
    let promise = async function(arg) {
      return arg;
    };
    let cb = _.callbackify(promise, {
      errorInCallback: false
    });
    cb(true, next);
  });

  it('passes on arguments with callbackFirst:true', function(done) {
    let next = function(_err, result) {
      expect(result).toBe(true);
      done();
    };
    let promise = async function(arg) {
      return arg;
    };
    let cb = _.callbackify(promise, {
      callbackFirst: true
    });
    cb(next, true);
  });

  it('passes on errors', function(done) {
    let next = function(err, _result) {
      expect(err).toMatchObject({message: 'foo'});
      done();
    };
    let promise = async function() {
      throw new Error('foo');
    };
    let cb = _.callbackify(promise);
    cb(next);
  });
});
