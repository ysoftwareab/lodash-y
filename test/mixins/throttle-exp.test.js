/*
eslint eslint-comments/no-use: 'off', eslint-comments/no-unlimited-disable: 'off'
*/

/*
eslint jest/expect-expect: [
  "error", {
    "assertFunctionNames": [
      "expect",
      "expectRun"
    ]
  }
]
*/

import _ from '../../src';

jest.setTimeout(10000);

describe('throttle-exp', function() {
  let expectRun = async function({wait, options, scenario, endDelay = 5000}) {
    expect.hasAssertions();
    let fn = jest.fn(function(arg) {
      return arg;
    });

    let throttled = _.throttleExp(fn, wait, options);

    // running scenario
    let returns = [];
    let expectedReturns = [];
    let expectedCalls = [];

    for (let step of scenario) {
      setTimeout(function() {
        if (step.cancel) {
          throttled.cancel();
          return;
        }

        if (step.flush) {
          expectedReturns.push(step.ret);
          returns.push(throttled.flush());
          return;
        }

        if (step.invoke) {
          expectedCalls.push([
            step.t
          ]);
        }

        expectedReturns.push(step.ret);
        returns.push(throttled(step.t));
      }, step.t);
    }

    // letting throttle to execute trailing invocations
    jest.advanceTimersByTime(_.last(scenario).t + endDelay);

    // running checks
    expect(fn.mock.calls).toEqual(expectedCalls); // eslint-disable-line
    expect(returns).toStrictEqual(expectedReturns);
  };

  beforeEach(function() {
    jest.useFakeTimers();
  });

  afterEach(function() {
    jest.useRealTimers();
  });

  it('should invoke and return correctly with default options', async function() {
    let wait = 100;

    /* eslint-disable */
    let scenario = [
      {t: 1, invoke: true, ret: 1},
      {t: 2, invoke: false, ret: 1},
      {t: 3, invoke: true, ret: 1}
    ];
    /* eslint-enable */

    await expectRun({wait, options: undefined, scenario, endDelay: 500});
  });

  it('should invoke and return correctly on leading and trailing', async function() {
    let wait = 100;
    let options = {
      leading: true,
      trailing: true,
      multiplier: 1.5
    };

    /* eslint-disable */
    let scenario = [
      {t: 1, invoke: true, ret: 1}, // throttle to 1 + 100 = 101
      {t: 2, invoke: false, ret: 1},
      {t: 3, invoke: true, ret: 1}, // immediatly returning cached, but invoking trailing on 101
                                    // throttle to 101 + 1.5*100 = 251
                                    // not hitting the waiting period, will relax next time
      {t: 260, invoke: true, ret: 260}, // throttle to 251 + 100 = 351
      {t: 261, invoke: true, ret: 260}, // invoke trailing, throttle to 351 + 1.5*100 = 501
      {t: 400, invoke: false, ret: 261},
      {t: 470, invoke: true, ret: 261}
    ];
    /* eslint-enable */

    await expectRun({wait, options, scenario, endDelay: 1000});
  });

  it('should invoke and return correctly on leading', async function() {
    let wait = 100;
    let options = {
      leading: true,
      trailing: false,
      multiplier: 1.5
    };

    /* eslint-disable */
    let scenario = [
      {t: 1, invoke: true, ret: 1},
      {t: 2, invoke: false, ret: 1},
      {t: 3, invoke: false, ret: 1},
      {t: 500, invoke: true, ret: 500},
      {t: 501, invoke: false, ret: 500},
      {t: 550, invoke: false, ret: 500},
      {t: 551, invoke: false, ret: 500}
    ]
    /* eslint-enable */

    await expectRun({wait, options, scenario, endDelay: 1000});
  });

  it('should invoke and return correctly on trailing', async function() {
    let wait = 100;
    let options = {
      leading: false,
      trailing: true,
      exp: 1.5
    };

    /* eslint-disable */
    let scenario = [
      {t: 1, invoke: false, ret: undefined},
      {t: 2, invoke: false, ret: undefined},
      {t: 3, invoke: true, ret: undefined},
      {t: 500, invoke: false, ret: 3},
      {t: 501, invoke: false, ret: 3},
      {t: 550, invoke: false, ret: 3},
      {t: 551, invoke: true, ret: 3}
    ]
    /* eslint-enable */

    await expectRun({wait, options, scenario, endDelay: 1000});
  });

  it('should throttle exponentially without trailing', async function() {
    let wait = 100;
    let options = {
      leading: true,
      trailing: false,
      multiplier: 1.5
    };

    /* eslint-disable */
    let scenario = [
      {t: 0, invoke: true, ret: 0}, // throttle till 100
      {t: 60, invoke: false, ret: 0},
      {t: 120, invoke: true, ret: 120}, // throttle till 120 + 100 x 1.5 = 270
      {t: 180, invoke: false, ret: 120},
      {t: 240, invoke: false, ret: 120},
      {t: 300, invoke: true, ret: 300},// throttle till 300 + 100 x 1.5 x 1.5 = 525
      {t: 360, invoke: false, ret: 300},
      {t: 420, invoke: false, ret: 300},
      {t: 480, invoke: false, ret: 300},
      {t: 540, invoke: true, ret: 540},
    ]
    /* eslint-enable */

    await expectRun({wait, options, scenario, endDelay: 1000});
  });

  it('should throttle exponentially with trailing', async function() {
    let wait = 100;
    let options = {
      leading: true,
      trailing: true,
      multiplier: 1.5
    };

    /* eslint-disable */
    let scenario = [
      {t: 0, invoke: true, ret: 0}, // throttle till 100
      {t: 60, invoke: true, ret: 0}, // trailing, throttle till 100 + 100x1.5 = 250
      {t: 120, invoke: false, ret: 60},
      {t: 180, invoke: false, ret: 60},
      {t: 220, invoke: true, ret: 60}, // trailing, throttle till 250 + 150x1.5 = 475
      {t: 300, invoke: false, ret: 220},
      {t: 360, invoke: false, ret: 220},
      {t: 420, invoke: true, ret: 220}, // trailing, throttle till 475 + 225x1.5 = 785
      {t: 850, invoke: true, ret: 850} // leading
    ]
    /* eslint-enable */

    await expectRun({wait, options, scenario, endDelay: 1000});
  });

  it('should not throttle longer than maxWait', async function() {
    let wait = 100;
    let options = {
      leading: true,
      trailing: false,
      multiplier: 5,
      maxWait: 200
    };

    /* eslint-disable */
    let scenario = [
      {t: 0, invoke: true, ret: 0}, // throttle till 100
      {t: 60, invoke: false, ret: 0},
      {t: 120, invoke: true, ret: 120}, // throttle till 120 + min(100 x 5, 200) = 320
      {t: 180, invoke: false, ret: 120},
      {t: 240, invoke: false, ret: 120},
      {t: 300, invoke: false, ret: 120},
      {t: 360, invoke: true, ret: 360}
    ]
    /* eslint-enable */

    await expectRun({wait, options, scenario, endDelay: 0});
  });

  it('should not throttle longer than maxWait with inverted divider', async function() {
    let wait = 100;
    let options = {
      leading: true,
      trailing: false,
      multiplier: 5,
      maxWait: 200,
      divider: 1 / 5
    };

    /* eslint-disable */
    let scenario = [
      {t: 0, invoke: true, ret: 0}, // throttle till 100
      {t: 60, invoke: false, ret: 0},
      {t: 120, invoke: true, ret: 120}, // throttle till 120 + min(100 x 5, 200) = 320
      {t: 180, invoke: false, ret: 120},
      {t: 240, invoke: false, ret: 120},
      {t: 300, invoke: false, ret: 120},
      {t: 360, invoke: true, ret: 360}
    ]
    /* eslint-enable */

    await expectRun({wait, options, scenario, endDelay: 0});
  });

  it('should throttle more and more with inverted divider', async function() {
    let wait = 100;
    let options = {
      leading: true,
      trailing: false,
      multiplier: 2,
      divider: 1 / 2
    };

    /* eslint-disable */
    let scenario = [
      {t: 0, invoke: true, ret: 0}, // throttle till 100
      {t: 150, invoke: true, ret: 150}, // throttle till 150 + 2x100 = 350
      {t: 300, invoke: false, ret: 150},
      {t: 360, invoke: true, ret: 360}, // throttle till 360 + 2x200 = 760
      {t: 750, invoke: false, ret: 360},
      {t: 780, invoke: true, ret: 780},
    ]
    /* eslint-enable */

    await expectRun({wait, options, scenario, endDelay: 0});
  });

  it('should invoke and return correctly on leading and trailing with inverted divider', async function() {
    let wait = 100;
    let options = {
      leading: true,
      trailing: true,
      multiplier: 1.5,
      divider: 1 / 1.5
    };

    /* eslint-disable */
    let scenario = [
      {t: 1, invoke: true, ret: 1}, // throttle to 1 + 100
      {t: 2, invoke: false, ret: 1},
      {t: 3, invoke: true, ret: 1}, // immediatly returning cached, but invoking trailing later
                                    // throttle to 101 + 100x1.5 = 251
      {t: 260, invoke: true, ret: 260}, // throttle to 260 + 150x1.5 = 485
      {t: 450, invoke: false, ret: 260},
      {t: 480, invoke: true, ret: 260}, // invoked as trailing
                                        // throttle to 485 + 225x1.5 = 823
      {t: 840, invoke: true, ret: 840},
    ];
    /* eslint-enable */

    await expectRun({wait, options, scenario, endDelay: 2000});
  });

  it('should invoke and return correctly on leading and trailing with divider', async function() {
    let wait = 100;
    let options = {
      leading: true,
      trailing: true,
      multiplier: 5,
      divider: 2
    };

    /* eslint-disable */
    let scenario = [
      {t: 1, invoke: true, ret: 1}, // throttle to 1 + 100
      {t: 2, invoke: false, ret: 1},
      {t: 3, invoke: true, ret: 1}, // immediatly returning cached, but invoking trailing later
                                    // throttle to 101 + 100x5 = 601
      {t: 610, invoke: true, ret: 610}, // invoke, throttle to 601 + 500x5 = 3101
      {t: 3200, invoke: true, ret: 3200}, // invoke, throttle to 3101 + 2500 / 2 = 4351
      {t: 4400, invoke: true, ret: 4400}, // invoke
    ];
    /* eslint-enable */

    await expectRun({wait, options, scenario, endDelay: 5000});
  });

  it('should not invoke when canceled', async function() {
    let wait = 100;
    let options = {
      leading: false,
      trailing: true,
      multiplier: 5,
      divider: 2
    };

    /* eslint-disable */
    let scenario = [
      {t: 1, invoke: false, ret: undefined}, // throttle to 1 + 100
      {t: 90, cancel: true}
    ];
    /* eslint-enable */

    await expectRun({wait, options, scenario, endDelay: 5000});
  });

  it('should invoke on flush', async function() {
    let wait = 100;
    let options = {
      leading: false,
      trailing: true,
      multiplier: 5
    };

    /* eslint-disable */
    let scenario = [
      {t: 1, invoke: true, ret: undefined}, // throttle to 1 + 100
      {t: 90, flush: true, ret: 1},
      {t: 95, cancel: true }
    ];
    /* eslint-enable */

    await expectRun({wait, options, scenario, endDelay: 5000});
  });

  it('should not invoke on flush without trailing', async function() {
    let wait = 100;
    let options = {
      leading: true,
      trailing: false,
      multiplier: 5
    };

    /* eslint-disable */
    let scenario = [
      {t: 1, invoke: true, ret: 1}, // throttle to 1 + 100
      {t: 2, invoke: false, ret: 1},
      {t: 90, flush: true, ret: 1},
    ];
    /* eslint-enable */

    await expectRun({wait, options, scenario, endDelay: 5000});
  });

  it('should not invoke on flush after cancel', async function() {
    let wait = 100;
    let options = {
      leading: false,
      trailing: true,
      multiplier: 5
    };

    /* eslint-disable */
    let scenario = [
      {t: 1, invoke: false, ret: undefined}, // throttle to 1 + 100
      {t: 90, cancel: true},
      {t: 95, flush: true, ret: undefined},
    ];
    /* eslint-enable */

    await expectRun({wait, options, scenario, endDelay: 5000});
  });
});
