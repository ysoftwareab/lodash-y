let _ = require('lodash');

module.exports = {
  root: true,

  extends: [
    'y/node'
  ],

  rules: {
    'max-classes-per-file': 'off'
  },

  overrides: [{
    files: [
      '*.ts'
    ],

    extends: [
      'y/configs/typescript'
    ]
  }]
};
