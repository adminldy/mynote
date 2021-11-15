const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')
const getModuleInfo = (file) => {
  const body = fs.readFileSync(file, 'utf-8')
  const ast = parser.parse(body, {
    sourceType: 'module'
  })
  const deps = {}
  // 遍历ast语法树 收集依赖
  traverse(ast, {
    ImportDeclaration({node}) {
      const dir = path.dirname(file)
      const absPath = './' + path.join(dir, node.source.value+'.js')
      deps[node.source.value] = absPath
    }
  })
  // 根据Ast ES6 转 ES5
  const {code} = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  })
  const module = {
    file,
    deps,
    code
  }
  return module
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

const bundle = (file) => {
  const depsGrapth = JSON.stringify(parseModule('./src/index.js'))
  return `(function(depsGrapth){
    function require(filePath) {
      function absRequire(relativePath) {
        return require(depsGrapth[relativePath])
      }
      const exports = {};
      (function(code, require, exports) {
        eval(code)
      })(depsGrapth[filePath].code, absRequire, exports)
      return exports
    }
    require('${file}')
  })(${depsGrapth})`
}

const content = bundle('./src/index.js')

// fs.mkdirSync('./dist')

fs.writeFileSync('./dist/bundle.js', content)