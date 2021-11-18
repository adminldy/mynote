const path = require('path')
const DemoWebpackPlugin = require('./demo-webpack-plugin')
const ConsoleLogOnBuildWebpackPlugin = require('./ConsolePlugin')
const CommonApi = require('./commonApi')
module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    // new DemoWebpackPlugin(),
    // new ConsoleLogOnBuildWebpackPlugin(),
    new CommonApi()
  ]
}