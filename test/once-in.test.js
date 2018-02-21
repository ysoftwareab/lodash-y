import _ from 'lodash';

import onceIn from '../src/once-in';

test(`'onceIn' when called first time should return a function that invokes 'func' and return its result`, function() {
  let funcResult = 'zero';
  let arg1 = 'one';
  let arg2 = 'two';
  let arg3 = 'threee';

  let func = jest.fn(function() {
    return funcResult;
  });

  let throttled = onceIn(func, 100);

  expect(typeof throttled).toBe('function');

  expect(func).not.toBeCalled();
  let invocationResult = throttled(arg1, arg2, arg3);

  expect(func).toBeCalledWith(arg1, arg2, arg3);
  expect(invocationResult).toBe(funcResult);
});


test(`'onceIn' when called more than once in 'interval' should return cached result and not invoke 'func'`, function() {
  let invocations = 0;
  let func = jest.fn(function() {
    invocations = invocations + 1;
    return invocations;
  });

  let throttled = onceIn(func, 100);

  // first invocations during 'interval'
  _.times(10, function() {
    let invocationResult = throttled();

    expect(func).toHaveBeenCalledTimes(1);
    expect(invocationResult).toBe(1);
  });
});


test(`'onceIn' when invoked second time after 'interval' should invoke 'func' and return new result`, function(done) {
  let invocations = 0;
  let func = jest.fn(function() {
    invocations = invocations + 1;
    return invocations;
  });

  let throttled = onceIn(func, 100);

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
  }, 100);
});


test(`'onceIn' when provided 0 'interval' should return a function which invokes a 'func' directly`, function() {
  let arg1 = 'one';
  let arg2 = 'two';
  let arg3 = 'threee';

  let invocations = 0;
  let func = jest.fn(function() {
    invocations = invocations + 1;
    return invocations;
  });

  let throttled = onceIn(func, 0);

  _.times(10, function() {
    let invocationResult = throttled(arg1, arg2, arg3);

    expect(invocationResult).toBe(invocations);

    expect(func).toBeCalledWith(arg1, arg2, arg3);

    arg1 = arg1 + invocations;
    arg2 = arg2 + invocations;
    arg3 = arg3 + invocations;
  });

  expect(func).toHaveBeenCalledTimes(10);
});


test(`'onceIn' should return a function which has a method 'flush' resetting timer`, function() {
  let invocations = 0;
  let func = jest.fn(function() {
    invocations = invocations + 1;
    return invocations;
  });

  let throttled = onceIn(func, 0);
  expect(throttled.flush).toBeDefined();

  throttled();
  throttled.flush();
  throttled();

  expect(func).toHaveBeenCalledTimes(2);
});


test(`'onceIn' should return a function which has a method 'clear' resetting timer`, function() {
  let invocations = 0;
  let func = jest.fn(function() {
    invocations = invocations + 1;
    return invocations;
  });

  let throttled = onceIn(func, 0);
  expect(throttled.flush).toBeDefined();

  throttled();
  throttled.flush();
  throttled();

  expect(func).toHaveBeenCalledTimes(2);
});
