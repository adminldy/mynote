const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolveLoader: {
    // loader路径顺序从左往右
    modules: ['node_modules', './']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'syncLoader',
            options: {
              message: '升职加薪'
            }
          }, 
          {
            loader: 'asyncLoader'
          }
        ]
      }
    ]
  }
}