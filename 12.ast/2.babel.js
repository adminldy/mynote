// 核心库 提供了语法树的生成和遍历的功能
let core = require('@babel/core')
// 工具类 可能帮我们生成相应的节点
let types = require('babel-types')

let ArrowFuncitonsPlugin = require('babel-plugin-transform-es2015-arrow-functions')
// presetEnv是插件的合集， 包含了好几十个插件 let => var
let presetEnv = require('@babel/preset-env')
let sourceCode = `
  const sum = (a, b) => {
    console.log(this)
    return a + b
  }
`
// babel插件其实只是一个JS对象， 里面会有属性visitor对象
// 当babel在遍历语法树的时候，会看有没有插件里的访问器，拦截这个节点
// 如果有的话就会把对应的节点路径传给此函数
// nodePath 节点路径
// node 节点
let ArrowFuncitonsPlugin2 = {
  visitor: {
    ArrowFunctionExpression(nodePath) {
      let node = nodePath.node
      node.type = 'FunctionExpression'
    }
  }
}
/**
 * 1. 根据源代码老的语法树
 * 2. 遍历老的语法树
 * 3. 遍历的时候找注册的插件， 找这些插件指定的访问节点
 * 插件的核心 把老的语法树转成新的语法树
 * 原则 尽可能少动少改， 尽可能复用原来的节点
 */
// @babel/core.transform = esprima + estraverse + escodegen
let targetCode = core.transform(sourceCode, {
  presets: [presetEnv]
})

console.log(targetCode.code)