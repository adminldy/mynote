// 对于我们自己的模块， 模块id是相对路径
var modules = {
  "./src/index.js": (module, exports, require) => {
    module.exports = "title";
  },
};

let cache = {};

function myRequire(path) {
  if (cache[path] !== undefined) {
    return cache[path];
  }
  let module = {
    exports: {},
  };
  modules[path](module,module.exports,myRequire)
  cache[path] = module.exports
  return module.exports
}

let abc = myRequire('./src/index.js')
console.log(abc)