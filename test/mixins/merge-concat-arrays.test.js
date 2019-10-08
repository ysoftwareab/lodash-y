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

describe('mergeConcatArrays', function() {
  it('should work as usual for objects and sources without arrays', function() {
    _.forEach(noArrays, function(object) {
      _.forEach(noArrays, function(source) {
        // use {} as first arg as way to clone object
        let merge = _.merge({}, object, source);
        let mergeConcatArrays = _.mergeConcatArrays({}, object, source);
        expect(mergeConcatArrays).toStrictEqual(merge);
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
        let mergeConcatArrays = _.mergeConcatArrays({}, object, source);
        expect(mergeConcatArrays).toStrictEqual(merge);
      });
    });
  });

  it('should concat arrays', function() {
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

    let mergeConcatArrays = _.mergeConcatArrays({}, oneArray, anotherOneArray);
    expect(mergeConcatArrays).toStrictEqual({
      a: [
        0,
        1,
        1
      ]
    });
  });
});
