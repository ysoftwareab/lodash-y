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
    // eslint-disable-next-line no-empty-function
    let promise = async function(arg) {
      return arg;
    };
    let cb = _.callbackify(promise);
    let next = function(_err, result) {
      expect(result).toBe(true);
      done();
    };
    cb(true, next);
  });

  it('passes on arguments with errorInCallback:false', function(done) {
    // eslint-disable-next-line no-empty-function
    let promise = async function(arg) {
      return arg;
    };
    let cb = _.callbackify(promise, {
      errorInCallback: false
    });
    let next = function(result) {
      expect(result).toBe(true);
      done();
    };
    cb(true, next);
  });

  it('passes on arguments with callbackFirst:true', function(done) {
    // eslint-disable-next-line no-empty-function
    let promise = async function(arg) {
      return arg;
    };
    let cb = _.callbackify(promise, {
      callbackFirst: true
    });
    let next = function(_err, result) {
      expect(result).toBe(true);
      done();
    };
    cb(next, true);
  });

  it('passes on errors', function(done) {
    // eslint-disable-next-line no-empty-function
    let promise = async function() {
      throw new Error('foo');
    };
    let cb = _.callbackify(promise);
    let next = function(err, _result) {
      expect(err).toMatchObject({message: 'foo'});
      done();
    };
    cb(next);
  });
});
