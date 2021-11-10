let core = require('@babel/core')
let types = require('babel-types')
let ClassPlugin = require('@babel/plugin-transform-classes')

let es6Code = `
  class abc {
    constructor() {
      this.abc = '12'
    }
  }
`

let es5Code = core.transform(es6Code, {
  plugins: [ClassPlugin]
})

console.log(es5Code.code)

let transformClasses2 = {
  visitor: {
    classDeclaration(nodePath) {
      const {node} = nodePath
      const ref = node.id
      path.replaceWith(/*新节点*/)
    }
  }
}
/**
 * 
 */