const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  entry: './src/index.js',
  devtool: 'cheap-source-map',
  output: {
    filename: 'app.min.js',
    path: path.resolve(__dirname, '..', 'public', 'js')
  }
}