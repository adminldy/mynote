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
      const thisBinding = hoistFunctionEnvironment(nodePath)
      node.type = 'FunctionExpression'
    }
  }
}
// 把老树改成新树
function hoistFunctionEnvironment(fnPath) {
  // Program
  const thisEnvFn = fnPath.findParent(p => {
    return (p.isFunction() && !p.isArrowFunctionExpression()) || p.isProgram()
  })
  // 找当前的作用域哪些地方用到了this的路径
  let thisPaths = getScopeInfoInformation(fnPath)
  // 声明了一个this的别名变量， 默认是_this
  let thisBinding = '_this'
  if(thisPaths.length > 0) {
    // 在thisEnvFn的作用域内添加一个变量， 变量名_this， 初始化的值为this
    thisEnvFn.scope.push({
      id: types.identifier(thisBinding),
      init: types.thisExpression()
    })
    thisPaths.forEach(thisPath => {
      // 创建一个_this的标识符
      let thisBindingRef = types.identifier(thisBinding)
      // 把老路径上的节点配置成新节点
      thisPath.replaceWith(thisBindingRef)
    })
  }
}

function getScopeInfoInformation(fnPath) {
  let thisPaths = []
  // 遍历当前path所有子节点路径
  fnPath.traverse({
    ThisExpression(thisPath) {
      thisPath.push(thisPath)
    }
  })
  return thisPaths
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
  plugins: [ArrowFuncitonsPlugin]
})

console.log(targetCode.code)