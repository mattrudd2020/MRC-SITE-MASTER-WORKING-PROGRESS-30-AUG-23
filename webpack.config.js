const path = require('path');

module.exports = {
  entry: ['./src/file3.js', './src/file1.js',
    './src/file2.js', 
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
};