// 解析器 可以源代码转成抽象语法树
let esprima = require('esprima')
// 可以帮我们遍历语法树 以深度优先的方式进行遍历
let estraverse = require("estraverse")
// ecmascript code generator JS代码生成器
let escodegen = require('escodegen')
let code = `function ast(){}`
let ast = esprima.parse(code)
let indent = 0 //缩进的空格数
const padding = () => ' '.repeat(indent)
// 第二个参数是钩子函数
estraverse.traverse(ast, {
  enter(node) {
    console.log(padding() + node.type+'进入')
    indent += 2
  },
  leave(node) {
    indent -= 2
    console.log(padding() + node.type+'离开')
  }
})
// 可以把改造后的语法树重新还原为源代码
let result = escodegen.generate(ast)

console.log(result)