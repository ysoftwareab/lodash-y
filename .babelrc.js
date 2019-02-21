module.exports = {
  presets: [
    ['firecloud', {
      '@babel/preset-env': {
        targets: {
          browsers: [
            'last 2 Chrome versions'
          ],
          node: '8.10' // Latest AWS Lambda Node.js
        }
      }
    }]
  ],

  plugins: [
    'preval'
  ],

  sourceMaps: true,

  retainLines: true
};
