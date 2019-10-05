import _ from '../../src';

describe('limitInParallel', function() {
  it('should work as usual for parallelism limit=1', async function() {
    let ok = Symbol('ok');
    let fn = async function() {
      _.sleep(100);
      return ok;
    };
    fn = _.limitInParallel(fn);
    await expect(fn()).resolves.toStrictEqual(ok);
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
    await expect(fn()).resolves.toStrictEqual(ok);
  });

  it('should return a LimitInParallelError after parallelism limit is reached', async function() {
    let ok = Symbol('ok');
    let fn = async function() {
      _.sleep(100);
      return ok;
    };
    fn = _.limitInParallel(fn);
    fn();
    await expect(fn()).resolves.toBeInstanceOf(_.limitInParallel.Error);
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
    await expect(fn()).rejects.toBeInstanceOf(_.limitInParallel.Error);
  });
});
