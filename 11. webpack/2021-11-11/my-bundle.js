const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

function getModuleInfo(file) {
  const content = fs.readFileSync(file, 'utf-8')
  const ast = parser.parse(content, {
    sourceType: 'module'
  })
  const deps = {}
  traverse(ast, {  
    ImportDeclaration({node}) {
      const direaction = path.dirname(file)
      const absPath = './' + path.join(direaction, node.source.value)
      deps[node.source.value] = absPath
    }
  })
  const {code} = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"]
  })
  const module = {file, deps, code}
  return module
}

function parseModule(file) {
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

const modules = parseModule('./src/index.js')

function bundle(file) {
  const depsGrapth = parseModule(file)
  return `(function(depsGrapth){
    function require(file) {
      (function(){

      })()
    }
    require(${file})
  })(${depsGrapth})`
}
