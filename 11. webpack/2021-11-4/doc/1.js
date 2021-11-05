/**
 * babel-loader
 * @babel/core 转换代码的引擎 人
 * @babel/preset-env 菜谱
 */
/**
 * webpack loader的本质就是一个函数， 接收原来的内容 返回新的内容
 * @param {*} source 
 * @returns 
 */
function babelLoader(source) {
  let targetSource = babelCore.transform(source, {
    presets: ['@babel/preset-env'] // 具体转换规则
  })
  return targetSource
}
// AST