const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')
const fileManagerWebpackPlugin = require('filemanager-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const htmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
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
    watch: true, // 开启监控模式
    watchOptions: {
      ignored: /node_modules/, // 忽略变化的文件夹
      aggregateTimeout: 300, // 监听到变化发生后等300毫秒再去执行（防抖）
      poll: 1000 // 每秒问操作系统1000次
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
    resolve: {
       // 别名
      alias: {
        '~': path.resolve(__dirname, 'src'),
        '@': path.resolve(__dirname, 'src')
      },
    },
    // 对于除了JS和JSON之外得文件，让webpack认识， 需要配置loader
    // loader加载器可以把webpack不认识的模块转换成webpack认识的模块
    // 外部资源
    // externals: {
    //   lodash: '_' // 如果模块内部引用了lodash模块，会从window._上取值
    // },
    module: {
      rules: [
        // {
        //   test: /\.jsx?$/,
        //   loader: 'eslint-loader',
        //   enforce: 'pre',
        //   options: {fix: true},
        //   exclude: /node_modules/ // 对于node_modules里面的模块不需要检查代码
        // },
        {
          // 暴露全局变量
          test: require.resolve('lodash'),
          loader: 'expose-loader',
          options: {
            exposes: {
              globalName: '_',
              override: true
            }
          }
        },
        {
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                ["@babel/plugin-proposal-decorators", {legacy: true}],
                ["@babel/plugin-proposal-class-properties", {loose: true}]
              ]
            }
          }
        },
        {
          test: /\.txt$/,
          type: 'asset/source' // 表示这是一个普通资源， 直接加载
          // use: ["raw-loader"],
        },
        {
          test: /\.css/,
          use: [ // 最后一个loader是最左边的loader 一定要返回一个JS脚本
            MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.less/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
        },
        {
          test: /\.scss/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
      }),
      // 配置全局NODE_ENV
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      // 不再让webpack帮我们生成 sourcemap
      // new webpack.SourceMapDevToolPlugin({
      //   // 会在打包后文件的尾部去添加一行这样的文本
      //   append: `\n//# sourceMappingURL=http://127.0.0.1:8080/[url]`,
      //   filename: '[file].map' // main.js.map
      // }),
      // 文件管理插件，帮我们拷贝代码，删除代码
      // new fileManagerWebpackPlugin({
      //   events: {
      //     onEnd: {
      //       copy: [{
      //         source: './dist/*.map',
      //         destination: 'C:/前端笔记/mynote/11. webpack/2021-11-4/maps'
      //       }],
      //       delete: ['./dist/*.map']
      //     }
      //   }
      // })
      // 会自动向模块内部注入lodash模块，在模块内部可以通过_引用
      // new webpack.ProvidePlugin({
      //   '_': 'lodash'
      // }),
      // new htmlWebpackExternalsPlugin({
      //   externals: [{
      //     module: 'lodash',
      //     entry: '', 
      //     global: '_'
      //   }]
      // })
      // new copyWebpackPlugin({
      //   patterns: [
      //     {
      //       from: path.resolve(__dirname, 'src/design'),
      //       to: path.resolve(__dirname, 'dist/design')
      //     }
      //   ]
      // }),
      new CleanWebpackPlugin({ // 再重新打包前先把输出目录清空一下
        cleanOnceBeforeBuildPatterns: ['**/*']
      }),
      // 使css单独打包为一个文件
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      })
    ],
  };
};
