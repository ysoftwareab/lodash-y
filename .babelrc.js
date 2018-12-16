module.exports = {
  presets: [
    ['firecloud', {
      '@babel/preset-env': {
        targets: {
          browsers: [
            'latest 2 Chrome versions'
          ],
          node: '8.10' // Latest AWS Lambda Node.js
        }
      }
    }]
  ],

  sourceMaps: true,

  retainLines: true
};
