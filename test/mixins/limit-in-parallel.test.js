import _ from '../../src';

describe('limitInParallel', function() {
  it('should work as usual for parallelism limit=1', async function() {
    let ok = Symbol('ok');
    let fn = async function() {
      _.sleep(100);
      return ok;
    };
    fn = _.limitInParallel(fn);
    expect(await fn()).toStrictEqual(ok);
  });

  it('should work as usual for parallelism limit=2', async function() {
    let ok = Symbol('ok');
    let fn = async function() {
      _.sleep(100);
      return ok;
    };
    fn = _.limitInParallel(fn, {
      limit: 2
    });
    fn();
    expect(await fn()).toStrictEqual(ok);
  });

  it('should return a LimitInParallelError after parallelism limit is reached', async function() {
    let ok = Symbol('ok');
    let fn = async function() {
      _.sleep(100);
      return ok;
    };
    fn = _.limitInParallel(fn);
    fn();
    expect(await fn()).toBeInstanceOf(_.LimitInParallelError);
  });

  it('should throw a LimitInParallelError after parallelism limit is reached, when throwErr=true', async function() {
    let ok = Symbol('ok');
    let fn = async function() {
      _.sleep(100);
      return ok;
    };
    fn = _.limitInParallel(fn, {
      throwErr: true
    });
    fn();
    await expect(fn()).rejects.toBeInstanceOf(_.LimitInParallelError);
  });
});
