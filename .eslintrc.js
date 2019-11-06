let _ = require('lodash');

module.exports = {
  root: true,

  extends: [
    'firecloud/node'
  ],

  rules: {
    'max-classes-per-file': 'off'
  },

  overrides: [{
    files: [
      '*.ts'
    ],

    extends: [
      'firecloud/configs/typescript'
    ]
  }]
};
