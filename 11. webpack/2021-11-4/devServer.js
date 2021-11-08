/**
 * 假如说我们已经 有一个http服务器，想集成打包文件的功能
 */
let express = require('express')
let app = express()
const webpack = require('webpack')
// 什么是express中间件
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config')()
// compiler就是webpack编译对象
config.mode = 'development'
const compiler = webpack(config)
// 这个中间件获取到compiler对象后， 会根据webpack.config.js配置文件要求开始进行编译，并且返回产出的文件
app.get('/api/users', (req,res) => {
  res.json({data: 'users'})
})
// 静态文件中间件
app.use(webpackDevMiddleware(compiler, config.devServer))
app.listen(3000)