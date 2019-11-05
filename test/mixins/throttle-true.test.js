import _ from '../../src';

describe('throttleTrue', function() {
  it("returns a function that invokes 'fn' and return its result, when called for the first time", function() {
    let result = 'zero';
    let arg1 = 'one';
    let arg2 = 'two';
    let arg3 = 'threee';

    let fn = jest.fn(function(_arg1, _arg2, _arg3) {
      return result;
    });

    let throttled = _.throttleTrue(fn, 100);

    expect(typeof throttled).toBe('function');

    expect(fn).not.toHaveBeenCalled();
    let invocationResult = throttled(arg1, arg2, arg3);

    expect(fn).toHaveBeenCalledWith(arg1, arg2, arg3);
    expect(invocationResult).toBe(result);
  });


  it("returns cached result and doesn't invoke 'fn' when called more than once in 'interval'", function() {
    let invocations = 0;
    let fn = jest.fn(function() {
      invocations = invocations + 1;
      return invocations;
    });

    let throttled = _.throttleTrue(fn, 100);

    // first invocations during 'interval'
    _.times(10, function() {
      let invocationResult = throttled();

      expect(fn).toHaveBeenCalledTimes(1);
      expect(invocationResult).toBe(1);
    });
  });


  // eslint-disable-next-line jest/no-test-callback
  it("invokes 'fn' and returns a new result, when called the second time after 'interval'", async function(done) {
    let invocations = 0;
    let fn = jest.fn(function() {
      invocations = invocations + 1;
      return invocations;
    });

    let throttled = _.throttleTrue(fn, 100);

    // first invocations during 'interval'
    _.times(10, function() {
      throttled();
    });

    // after interval passed
    setTimeout(function() {
      let invocationResult = throttled();

      expect(fn).toHaveBeenCalledTimes(2);
      expect(invocationResult).toBe(invocations); // fresh value

      done();
    }, 150);
  });


  it("returns a function which invokes a 'fn' directly, when called with 'interval' = 0", function() {
    let arg1 = 'one';
    let arg2 = 'two';
    let arg3 = 'threee';

    let invocations = 0;
    let fn = jest.fn(function(_arg1, _arg2, _arg3) {
      invocations = invocations + 1;
      return invocations;
    });

    let throttled = _.throttleTrue(fn, 0);

    _.times(10, function() {
      let invocationResult = throttled(arg1, arg2, arg3);

      expect(invocationResult).toBe(invocations);

      expect(fn).toHaveBeenCalledWith(arg1, arg2, arg3);

      arg1 = arg1 + invocations;
      arg2 = arg2 + invocations;
      arg3 = arg3 + invocations;
    });

    expect(fn).toHaveBeenCalledTimes(10);
  });


  it("returns a function which has a method 'flush' that resets the timer", function() {
    let invocations = 0;
    let fn = jest.fn(function() {
      invocations = invocations + 1;
      return invocations;
    });

    let throttled = _.throttleTrue(fn, 0);
    expect(throttled.flush).toBeDefined();

    throttled();
    throttled.flush();
    throttled();

    expect(fn).toHaveBeenCalledTimes(2);
  });


  it("returns a function which has a method 'clear' that resets the timer", function() {
    let invocations = 0;
    let fn = jest.fn(function() {
      invocations = invocations + 1;
      return invocations;
    });

    let throttled = _.throttleTrue(fn, 0);
    expect(throttled.flush).toBeDefined();

    throttled();
    throttled.flush();
    throttled();

    expect(fn).toHaveBeenCalledTimes(2);
  });
});
