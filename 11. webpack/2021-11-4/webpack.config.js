const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')

const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// 将css单独打包
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = (env) => {
  return {
    mode: process.env.NODE_ENV,
    devtool: false,
    // 多入口文件
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[chunkhash:8].js",
      // 因为我们打包后的文件可能会通过网络传递到另一个方法
      // publicPath: '/' // 公开访问路径
    },
    devServer: {
      // 真实的含义是配置额外的静态文件根目录， 不用配置dist
      // contentBase: path.resolve(__dirname, 'public'),
      hot: true, // 配置模块热更新
      compress: true, // 启动压缩gzip
      port: 8080,
      open: true, // 启动之后自动打开浏览器
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          pathRewrite: {
            '^/api': ''
          }
        },
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [[
                "@babel/preset-env",
              ], "@babel/preset-react"],
              plugins: [
                ["@babel/plugin-proposal-decorators", {legacy: true}],
                ["@babel/plugin-proposal-class-properties", {loose: true}]
              ]
            }
          }
        },
        {
          test: /\.css/,
          use: [ // 最后一个loader是最左边的loader 一定要返回一个JS脚本
            MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', {
              loader: 'px2rem-loader',
              options: {
                remUnit: 75, // 一个REM是多少个像素
                remPrecision: 8 // 计算REM的单位，保留几位小数 设置精度
              }
            }]
        },
        {
          test: /\.less/,
          use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: { // 如果不配的话默认值是0
              importLoaders: 2
            }
          },'postcss-loader', 'less-loader']
        },
        {
          test: /\.scss/,
          use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader', 'sass-loader']
        },
        {
          test: /\.(jpg|png|bmp|gif|svg)$/,
          type: 'asset/resource' // 相当于原来的 file-loader 强制拷贝
          // use: [{
          //   // url-loader可以把一些小图片变成base64字符串内嵌在页面中
          //   loader: 'url-loader',
          //   options: {
          //     // name: '[hash:10].[ext]',
          //     esModule: false, // 是否包装成一个ES6模块 Module.default
          //     limit: 8 * 1024, // 8k 当小于limit内联到html 不打包
          //     outputPath: 'images', // 指定写入到输出目录里
          //     publicPath: '/images'
          //   }
          // },
          // ]
        },
        // {
        //   test: /\.(jpg)$/,
        //   type: 'asset/inline' // 相当于原来url-loader 强制base64
        // },
      ],
    },
    plugins: [
      // 插件可以插入webpack打包整个流程
      // 这个插件会向输出目录写入一个index.html文件， 并且会在文件里插入打包后的脚本
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        // minify: { // 压缩HTML
        //   collapseWhitespace: true,
        //   removeComments: true
        // }
      }),
      new CleanWebpackPlugin({ // 再重新打包前先把输出目录清空一下
        cleanOnceBeforeBuildPatterns: ['**/*']
      }),
    ],
  };
};
