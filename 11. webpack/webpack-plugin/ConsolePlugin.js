const { Compilation } = require("webpack")

const pluginName = 'ConsoleLogOnBuildWebpackPlugin'

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tapAsync(pluginName, (compliation,callback) => {
      // Hook 回调方法注入了 compilation 实例，compilation 能够访问当前构建时的模块和相应的依赖。
      setTimeout(() => {
        console.log('webpack 构建过程开始')
        callback() 
      }, 1000)
    })
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin