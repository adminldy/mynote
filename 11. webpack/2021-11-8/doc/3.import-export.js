let modules = {
  './src/title.js': (module, exports, require) => {
    require.r(exports) // 标识 这是一个ES模块
    require.d(exports, {
      default: () => DEFAULT_EXPORTS,
      age: () => age
    })
    const DEFAULT_EXPORTS = 'title_default'
    const age = 'age'
  }
}

let cache = {};

function require(path) {
  if (cache[path] !== undefined) {
    return cache[path];
  }
  let module = {
    exports: {},
  };
  modules[path](module,module.exports,require)
  cache[path] = module.exports
  return module.exports
}

require.r = (exports) => {
  // 它通常作为对象的属性键使用，对应的属性值应该为字符串类型 
  // 通常只有内置的 Object.prototype.toString() 方法会去读取这个标签并把它包含在自己的返回值里
  Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'}) // toString [Object Module]
  Object.defineProperty(exports, '__esModule', {value: true}) // exports.__esModule = true
}

require.o = (obj, prop) => obj.hasOwnProperty(prop) 

require.d = (exports, definition) => {
  for(let key in definition) {
    if(require.o(definition, key)) {
      Object.defineProperty(exports, key, {
        get: definition[key]
      })
    }
  }
}

let exports = {}
require.r(exports)
let title = require('./src/title.js')
console.log(title.default)
console.log(title.age)
