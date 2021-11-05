const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')
// 在配置文件中默认获取不到这个process.env.NODE_ENV=undefined
module.exports = (env) => {
  // let isProduction = env.production // 是否是生产
  // let isDevelopment = env.development // 是否是开发
  return {
    mode: process.env.NODE_ENV,
    devtool: false,
    // 多入口文件
    entry: {
      main: "./src/index.js",
      // index1: './src/index.js',
      // index2: './src/index2.js'
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
      // 因为我们打包后的文件可能会通过网络传递到另一个方法
      // publicPath: '/' // 公开访问路径
    },
    devServer: {
      // 真实的含义是配置额外的静态文件根目录， 不用配置dist
      // contentBase: path.resolve(__dirname, 'public'),
      hot: true, // 配置模块热更新
      compress: true, // 启动压缩gzip
      port: 8080,
      open: true // 启动之后自动打开浏览器
    },
    // 对于除了JS和JSON之外得文件，让webpack认识， 需要配置loader
    // loader加载器可以把webpack不认识的模块转换成webpack认识的模块
    module: {
      rules: [
        {
          test: /\.txt$/,
          use: ["raw-loader"],
        },
        {
          test: /\.css/,
          use: [ // 最后一个loader是最左边的loader 一定要返回一个JS脚本
            'style-loader', 'css-loader']
        },
        {
          test: /\.less/,
          use: ['style-loader', 'css-loader', 'less-loader']
        },
        {
          test: /\.scss/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ],
    },
    plugins: [
      // 插件可以插入webpack打包整个流程
      // 这个插件会向输出目录写入一个index.html文件， 并且会在文件里插入打包后的脚本
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
      }),
      // 配置全局NODE_ENV
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ],
  };
};
