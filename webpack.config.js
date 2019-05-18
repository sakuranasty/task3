const path= require('path');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path:path.resolve(__dirname,'build'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  }
}