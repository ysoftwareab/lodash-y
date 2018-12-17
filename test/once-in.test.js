import _ from '../src';

describe('onceIn', function() {
  it("returns a function that invokes 'func' and return its result, when called for the first time", function() {
    let funcResult = 'zero';
    let arg1 = 'one';
    let arg2 = 'two';
    let arg3 = 'threee';

    let func = jest.fn(function() {
      return funcResult;
    });

    let throttled = _.onceIn(func, 100);

    expect(typeof throttled).toBe('function');

    expect(func).not.toHaveBeenCalled();
    let invocationResult = throttled(arg1, arg2, arg3);

    expect(func).toHaveBeenCalledWith(arg1, arg2, arg3);
    expect(invocationResult).toBe(funcResult);
  });


  it("returns cached result and doesn't invoke 'func' when called more than once in 'interval'", function() {
    let invocations = 0;
    let func = jest.fn(function() {
      invocations = invocations + 1;
      return invocations;
    });

    let throttled = _.onceIn(func, 100);

    // first invocations during 'interval'
    _.times(10, function() {
      let invocationResult = throttled();

      expect(func).toHaveBeenCalledTimes(1);
      expect(invocationResult).toBe(1);
    });
  });


  // eslint-disable-next-line jest/no-test-callback
  it("invokes 'func' and returns a new result, when called the second time after 'interval'", async function(done) {
    let invocations = 0;
    let func = jest.fn(function() {
      invocations = invocations + 1;
      return invocations;
    });

    let throttled = _.onceIn(func, 100);

    // first invocations during 'interval'
    _.times(10, function() {
      throttled();
    });

    // after interval passed
    setTimeout(function() {
      let invocationResult = throttled();

      expect(func).toHaveBeenCalledTimes(2);
      expect(invocationResult).toBe(invocations); // fresh value

      done();
    }, 150);
  });


  it("returns a function which invokes a 'func' directly, when called with 'interval' = 0", function() {
    let arg1 = 'one';
    let arg2 = 'two';
    let arg3 = 'threee';

    let invocations = 0;
    let func = jest.fn(function() {
      invocations = invocations + 1;
      return invocations;
    });

    let throttled = _.onceIn(func, 0);

    _.times(10, function() {
      let invocationResult = throttled(arg1, arg2, arg3);

      expect(invocationResult).toBe(invocations);

      expect(func).toHaveBeenCalledWith(arg1, arg2, arg3);

      arg1 = arg1 + invocations;
      arg2 = arg2 + invocations;
      arg3 = arg3 + invocations;
    });

    expect(func).toHaveBeenCalledTimes(10);
  });


  it("returns a function which has a method 'flush' that resets the timer", function() {
    let invocations = 0;
    let func = jest.fn(function() {
      invocations = invocations + 1;
      return invocations;
    });

    let throttled = _.onceIn(func, 0);
    expect(throttled.flush).toBeDefined();

    throttled();
    throttled.flush();
    throttled();

    expect(func).toHaveBeenCalledTimes(2);
  });


  it("returns a function which has a method 'clear' that resets the timer", function() {
    let invocations = 0;
    let func = jest.fn(function() {
      invocations = invocations + 1;
      return invocations;
    });

    let throttled = _.onceIn(func, 0);
    expect(throttled.flush).toBeDefined();

    throttled();
    throttled.flush();
    throttled();

    expect(func).toHaveBeenCalledTimes(2);
  });
});
