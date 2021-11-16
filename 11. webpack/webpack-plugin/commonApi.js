class MyPlugin {
  apply(compiler) {
    console.log('compiler', compiler)
    compiler.hooks.emit.tabAsync("MyPlugin", function (compilation, callback) {
      // compilation.chunks 存放所有代码块 是一个数组
      compilation.chunks.forEach(function (chunk) {
        // chunk代表一个代码块
        // 代码块由多个模块组成 通过 chunk.forEachModule 能读取数组代码块的每个模块
        chunk.forEachModule(function (module) {
          // module代表一个模块
          // module.fileDependencies 存放当前模块所有依赖的文件路径，是一个数组
          module.fileDependencies.forEach(function (filePath) {
            console.log('filePath', filePath)
          });
        });
      });
      // Webpack 会根据 Chunk去生成输出的文件资源， 每个Chunk都对应一个及其以上的输出文件
      // 例如在 Chunk中包含了 CSS模块 并且使用了 ExtractTextPlugin时
      // 该 Chunk就会生成.js 和 .css两个文件
      chunk.files.forEach(function (filename) {
        // compilation.assets存放当前所有即将输出的资源
        // 调用一个输出资源的 source() 方法能获取到输出资源的内容
        let source = compilation.assets[filename].source();
        console.log('source', source)
      });

      // 这是一个异步事件， 要记得调用 callback 通知 webpack本次事件监听处理结束。
      // 如果忘记了调用callback Webpack将一直卡在这里不往后执行
      callback();
    });
  }
}

module.exports = MyPlugin