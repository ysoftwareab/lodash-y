import _ from '../../src';

let noArrays = [];
noArrays.push({
  a: 0
});
noArrays.push({
  a: 1
});
noArrays.push({
  a: false
});
noArrays.push({
  a: true
});
noArrays.push({
  a: ''
});
noArrays.push({
  a: 'string'
});
noArrays.push({
  a: {
    b: 0
  }
});
noArrays.push({
  a: {
    b: 1
  }
});

let oneArray = {
  a: [
    0,
    1
  ]
};

describe('mergeWithoutArrays', function() {
  it('should work as usual for objects and sources without arrays', function() {
    _.forEach(noArrays, function(object) {
      _.forEach(noArrays, function(source) {
        // use {} as first arg as way to clone object
        let merge = _.merge({}, object, source);
        let mergeWithoutArrays = _.mergeWithoutArrays({}, object, source);
        expect(mergeWithoutArrays).toStrictEqual(merge);
      });
    });
  });

  it('should work as usual for objects without arrays', function() {
    _.forEach(noArrays, function(object) {
      _.forEach([
        ...noArrays,
        oneArray
      ], function(source) {
        // use {} as first arg as way to clone object
        let merge = _.merge({}, object, source);
        let mergeWithoutArrays = _.mergeWithoutArrays({}, object, source);
        expect(mergeWithoutArrays).toStrictEqual(merge);
      });
    });
  });

  it('should override arrays', function() {
    let anotherOneArray = {
      a: [
        1
      ]
    };

    let merge = _.merge({}, oneArray, anotherOneArray);
    expect(merge).toStrictEqual({
      a: [
        1,
        1
      ]
    });

    let mergeWithoutArrays = _.mergeWithoutArrays({}, oneArray, anotherOneArray);
    expect(mergeWithoutArrays).toStrictEqual(anotherOneArray);
  });
});
