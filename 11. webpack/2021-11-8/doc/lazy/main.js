// 在原始的main.js里没有任何模块定义
var modules = {}
// 缓存对象
let cache = {}
// 能在浏览器里跑的require方法
function require(moduleId) {
  if(cache[moduleId]) {
    return cache[moduleId].exports
  }
  let module = cache[moduleId] = {
    exports: {

    }
  }
  modules[moduleId](module, module.exports, require)
  return module.exports
}
// 通过require.m属性可以有获取模块定义 HMR
require.modules = modules
// 判断一个对象上有没有某个属性
require.ownProperty = (obj, prop) => obj.hasOwnProperty(prop)
// 给一个对象上定义属性
require.defineProperties = (exports, definition) => {
  for(let key in definition) {
    if(require.ownProperty(key)) {
      Object.defineProperty(exports, key, {
        get: definition[key]
      })
    }
  }
}
// 
require.functions = {}
// key是代码块的名字 0标识此代码块已经加载完成
let installedChunks = {
  main: 0
}
require.load = (url) => {
  let script = document.createElement('script')
  script.src = url
  document.head.appendChild(script)
}
require.p = ''
require.unionFilename = (chunkId) => chunkId+'.js'
// 通过jsonp加载chunk的代码，并且创建promise放到数组里
require.functions.jsonp = (chunkId, promises) => {
  // 先判断installedChunks有没有已经加载过的 或者 正在加载中的installedChunkData, 如果有复用老的直接返回
  let installedChunkData = require.ownProperty(installedChunkData, chunkId) ? installedChunks[chunkId] : undefined
  if(installedChunkData !== 0) { // 不等于0表示没有加载完成 第二次懒加载一个代码块的时候
    if(installedChunkData) { // 但是有值，说明很可能正在加载中
      promises.push(installedChunkData[2]) // 取出上一个promise放到数组里
    }else { // 第一次的时候
      let promise = new Promise((resolve, reject) => {
        installedChunkData = installedChunks[chunkId] = [resolve, reject]
      })
      installedChunkData[2] = promise // installedChunkData = [resolve, reject, promise]
      promises.push(promise)
      let url = require.p + require.unionFilename(chunkId)
      require.load(url)
    }
  }
}
// 通过JSONP异步加载代码块 chunkId=src_title_j
require.ensure = (chunkId) => {
  let promises = []
  // ['jsonp']
  Object.keys(require.functions).forEach(func => func(chunkId, promises))
  return Promise.all(promises)
}
require.u = (chunkId) => {
  return chunkId + '.js'
}
function webpackJsonpCallback(data) {
  let [chunkIds, moreModules] = data
  for(let moduleId in moreModules) {
    require.modules[moduleId] = moreModules[moduleId]
  }
}

let chunkLoadingGlobal = window['webpack5'] = []

chunkLoadingGlobal.push = webpackJsonpCallback