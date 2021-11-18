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
// 插件是一个对象， 它有个属性visitor访问者， 访问器
let transformClasses2 = {
  visitor: {
    ClassDeclaration(nodePath) {
      const {node} = nodePath
      const id = node.id // {type: identifier, name: Person}
      let methods = node.body.body
      let functions = []
      console.log('methods', methods)
      methods.forEach(classMethod => {
        if(classMethod.kind === 'constructor') {
          let constructorFunction = t.functionDeclaration(
            id, classMethod.params, classMethod.body, classMethod.generator, classMethod.async
          )
          functions.push(constructorFunction)
        } else {
          let prototypeMemberExpression = t.memberExpression(id, t.identifier(''))
          let memberFunction = t.functionDeclaration(
            id, classMethod.params, classMethod.body, classMethod.generator, classMethod.async
          )
          functions.push(constructorFunction)
          let assignmentExpression = t.assignmentExpression("=", left, memberFunction)
        }
      })
    }
  }
}

let es5Code = core.transform(es6Code, {
  plugins: [transformClasses2]
})

console.log(es5Code)


/**
 * 
 */