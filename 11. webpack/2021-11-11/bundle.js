const fs = require('fs')
const path = require('path')
// 将获取到的模块内容 解析成ast语法树
const parser = require('@babel/parser')
// 用于遍历AST 将用到的依赖收集起来 （import引入的文件路径）
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')
const getModuleInfo = (file) => {
  const body = fs.readFileSync(file, 'utf-8')
  const ast = parser.parse(body, {
    sourceType: 'module' // 表示解析的es模块
  })
  const deps = {}
  traverse(ast, {
    ImportDeclaration({node}) {
      // 目录名称
      const dirname = path.dirname(file)
      const abspath = './' + path.join(dirname, node.source.value)
      deps[node.source.value] = abspath
    }
  })
  // 将es6转成es5
  const {code} = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"]
  })
  const moduleInfo = {file, deps, code}
  return moduleInfo
}

const parseModule = (file) => {
  const entry = getModuleInfo(file)
  const temp = [entry]
  const depsGrapth = {}
  for(let i = 0;i < temp.length;i++) {
    const deps = temp[i].deps
    if(deps) {
      for(let key in deps) {
        temp.push(getModuleInfo(deps[key]))
      }
    }
  }
  temp.forEach(item => {
    depsGrapth[item.file] = {
      deps: item.deps,
      code: item.code
    }
  })
  return depsGrapth
}

/**
 * parseModules方法
 * 1. 首先传入主模块路径
 * 2. 将获得的模块信息放到temp数组
 * 3. 循环遍历temp数组
 * 4. 循环里面再获得主模块的依赖deps
 * 5. 遍历deps，通过调用getModuleInfo将获得的依赖模块信息push到temp数组里
 */

const bundle = (file) => {
  const depsGrapth = JSON.stringify(parseModule(file))
  return `(function(graph) {
    function require(file) {
      function absRequire(relPath) {
        return require(graph[file].deps[relPath])
      }
      var exports = {};
      (function(require, exports, code){
        eval(code)
      })(absRequire, exports, graph[file].code)
      return exports
    }
    require('${file}')
  })(${depsGrapth})`

}
const content = bundle('./src/index.js')

// 写入到dist目录下
fs.mkdirSync('./dist')
fs.writeFileSync('./dist/bundle.js', content)