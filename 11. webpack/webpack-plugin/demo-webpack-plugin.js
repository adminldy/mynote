class DemoWebpackPlugin {
  constructor() {
    console.log('plugin init')
  }
  apply(compiler) {
    // compliation代表每一次执行打包，独立的编译
    compiler.hooks.compile.tap('DemoWebpackPlugin', compliation => {
      console.log(compliation)
    })
    // 生成资源到 output 目录之前
    compiler.hooks.emit.tapAsync('DemoWebpackPlugin', (compliation, fn) => {
      console.log(compliation)
      compliation.assets['index.md'] = {
        source: function() {
          return 'this is a demo for plugin'
        },
        size: function() {
          return 25
        }
      }
      fn()
    })
  }
}

module.exports = DemoWebpackPlugin