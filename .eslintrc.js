module.exports = {
  root: true,

  extends: [
    'firecloud/node'
  ],

  rules: {
    // https://github.com/microsoft/TypeScript-wiki/blob/master/JSDoc-support-in-JavaScript.md
    'valid-jsdoc': ['error', {
      prefer: {
        // no synonyms
        arg: 'param',
        argument: 'param',
        const: 'constant',
        defaultvalue: 'default',
        desc: 'description',
        emits: 'fires',
        exception: 'throws',
        extends: 'augments',
        fileoverview: 'file',
        func: 'function',
        host: 'external',
        method: 'function',
        overview: 'file',
        return: 'returns',
        var: 'member',
        virtual: 'abstract',
        yield: 'yields'
      },
      preferType: {
        BigInt: 'bigint',
        Boolean: 'boolean',
        Null: 'null',
        Number: 'number',
        String: 'string',
        Symbol: 'symbol',
        Undefined: 'undefined',
        Void: 'void',
        array: 'Array',
        function: 'Function',
        object: 'Object'
      },
      requireParamDescription: false,
      requireReturnDescription: false
    }]
  }
};
