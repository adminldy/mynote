var modules = {
  './src/index.js': (module, exports, require) => {
    module.exports = {
      age: 123
    }
  }
}

const cache = {}

function require(path) {
  if(cache[path]) {
    return cache[path].exports
  }
  const module = cache[path] = {
    exports: {

    }
  }
  modules[path](module, module.exports, require)
  return module.exports
}

require.r = (exports) => {
  Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'})
  Object.defineProperty(exports, '__esmodule', {value: true})
}

require.d = (exports, defination) => {
  for(let key in defination) {
    Object.defineProperty(exports, key, {
      get: defination[key]
    })
  }
}
// 返回获取default默认导出的getter方法
require.n = function(module) {
  let getter = module.__esModule ? () => module.default : () => module
  return getter
}

// 这里的title就是返回的module.exports
const title = require('./src/index.js')
const title_default = require.n(title)
console.log(title_default())
console.log(title.age)
