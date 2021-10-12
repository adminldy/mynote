class Module {
  constructor(moduleName, source) {
    this.moduleName = moduleName // 模块名
    this.$source = source // 源代码
    this.$cacheModule = new Map() // 缓存模块的map对象
    this.exports = {} // 暴露对象
  }
  // 引入函数
  require = (moduleName, source) => {
    if (this.$cacheModule.has(moduleName)) {
      return this.$cacheModule.get(moduleName).exports // 直接返回缓存的暴露对象
    }
    const module = new Module(moduleName, source) // 新建一个module
    const exports = this.compile(module, source) // 交给compile函数去编译module
    this.$cacheModule.set(moduleName, module)
    return exports // 最终暴露这个对象
  }
  // IIFE字符串
  $wrap(source) {
    const wrapper = [
      `return (function(require, module, exports){`,
      `\n})`
    ]
    return wrapper[0] + source + wrapper[1]
  }
  // 沙箱环境
  // new Funciton 不允许访问闭包
  // with 不允许访问全局
  $runInContext(code, whiteList = ['console']) {
    const fun = new Function('sandbox', `with(sandbox) {${code}}`) // 把字符串变成函数并用with包裹
    return function (sandbox) {
      const proxiedObject = new Proxy(sandbox, {
        // 专门处理in操作符 当 return false时 忽略in操作符
        has(target, key) {
          if (!whiteList.includes(key)) {
            return true
          }
        },
        get(target, key, value) {
          // Symbol.unscopables代表不能被处理
          if (key === Symbol.unscopables) {
            return void 0
          }
          return Reflect.set(target, key, value)
        }
      })
      return fun(proxiedObject)
    }
  }
  // 编译并返回exports
  compile(module, source) {
    // 获取iife闭包字符串
    const iifeString = this.$wrap(source)
    const func = this.$runInContext(iifeString)({}) // 传入sandbox 并获取iife转化成的函数
    func(this.require, module, module.exports) // 执行函数把this.require, module, module.exports传进去 他们都是引用型变量
    return module.exports
  }
}

const m = new Module()

m.require('a.js', `const b = require('b.js', 'exports.action = function() { console.log("execute action from B module successfully 🎉") }')
b.action()
`)
// require -> 【1、模块加载（获取文件字符串）2、解释执行字符串 3、exports 4、缓存】
// IIFE 的方式把 require 塞进文件模块所在的域里面