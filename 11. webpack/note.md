#### 1. npm run build 干了什么

1. 找当前 package.json 下面的 scripts 下面的 build 这个 key， 拿到右边的 shell 脚本
2. 执行 webpack 命令
   2.1 第一步先看 node_modules\.bin\webpack.cmd 是否存在，如果存在的话就执行它
   2.2 如果不存在， 则会执行全局目录下面的 webpack.cmd

#### 2. webpack 使用图片

1. require('图片路径')
2. 可以在 css 中通过 background-image 引入
3. 可以在 html 里直接引入(这种方式不推荐)

#### 3. 配置 babel 插件

```js
// legacy 旧的意思
// loose 松散的意思
["@babel/plugin-proposal-decorators", { legacy: true }],
  ["@babel/plugin-proposal-class-properties", { loose: true }];
```

#### 4. webpack 分类

pre 前置
normal 正常
inline 内联
post 后置

pre => normal => inline => post

#### source-map

1. 生成单独的 source-map 文件
2. 包含完整的行和列信息
3. 在目标文件里建立关系， 从而能提示源文件原始位置

#### inline-source-map

- 以 base64 格式内联在打包后的文件里
- 包含完整的行和列信息
- 在目标文件里建立关系， 从而能提示源文件原始位置
- 不会生成单独的文件

#### hidden-source-map

- 会在外部生成 sourcemap, 但是在目标文件并没有建立关联，也不能提示原始错误位置

#### cheap-source-map

- 轻量的级的便宜的
- 只包含行映射，不包含列映射
- 不包含 babel 的 map 映射
- 不能看到最原始的 React 代码，只能看到 babel 转换后的 es5 代码

#### cheap-module-source-map

- 只包含行，不包含列
- 包含 babel 的 map 映射，可以看到最原始的代码

#### chunkhash

模块 => 从入口文件出发， 和它依赖模块构建成一个代码块 chunk => chunkd 会产生 asset assets 约等于文件
chunkHash 会根据不同的入口文件，进行依赖文件解析构建对应的 hash 值

#### useBuiltIns 如果不设置的话

- @babel/preset-env 只转换新的语法， 不转换 API 和方法
- 只转换最新 ES 语法： 比如 箭头函数
- 不转换
  - 最新 ES API ， 比如 Promise
  - 最新 ES 实例方法 比如 String.prototype.includes

#### plugin

Webpack 通过插件机制让其更加灵活。在 webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件， 在合适的时机通过 webpack 提供的 api 改变输出结果

先来看一个基础的 Plugin

```js
class BasicPlugin {
  // 在构造函数中获取用户给该插件传入的配置
  constructor(options) {}
  // Webpack 会调用 BasicPlugin 实例的apply方法给插件实例传入compiler对象
  apply(compiler) {
    compiler.plugin("compliation", function (compliation) {});
  }
}
// 导出Plugin
module.exports = BasicPlugin;
```

使用

```js
const BasicPlugin = require("./BasicPlugin.js");
module.exports = {
  plugins: [new BasicPlugin(options)],
};
```

Webpack 启动后， 在读取配置的过程中会先执行 new BasicPlugin(options) 初始化一个 BasicPlugin 获得其实例

在初始化 compiler 对象后， 在调用 basicPlugin.apply(compiler) 给插件示例传入 compiler 对象

插件实例在获取到 compiler 对象后，就可以通过 compiler.plugin(事件名称，回调函数)监听到 webpack 广播出来的事件

##### Compiler 和 Compilation

- Compiler 对象包含了 Webpack 环境所有的配置信息，包含 options, loaders, plugins 这些信息,
  这个对象在 Webpack 启动时候被实例化，它是全局唯一的， 可以简单的把他理解为 webpack 实例

- compilation 对象包含了当前的模块资源，编译生成资源，变化的文件等。 当 webpack 以开发模式运行时，
  每当检测到一个文件变化，一次新的 compilation 将被创建。compilation 对象也提供了很多事件回调供插件
  做扩展。通过 Compilation 也能读取到 Compiler 对象

  compiler 和 compilation 的区别在于： Compiler 代表了整个 webpack 从启动到关闭的生命周期，
  而 Compilation 只是代表了一次新的编译

##### 事件流

webpack 就像一条生产线，要经过一系列处理流程后才能将源文件转换成输出结果
这条生产线上的每个处理流程的职责都是单一的，多个流程之间存在依赖关系，只有完成当前处理才能交给下一个流程去处理
插件就像是一个插入到生产线的一个功能， 在特定的时机对生产线上的资源做处理

Webpack 在运行过程中会广播事件，插件只需要监听他所关心的事件， 就能加入到这条生产线中， 去改变生产线的运作。
wepack 事件流保证了插件的有序性。 使得整个系统扩展性很好。

webpack 的事件流机制应用了观察者模式

可以直接在 comiler 和 compilation 对象上广播和监听事件

```js
/**
 * 广播出事件
 * event-name 为事件名称， 注意不要和现有的事件重名
 * params 为附带的参数
 *
 */
compiler.apply("event-name", params);

/**
 * 监听名称为 event-name的事件，当event-name事件发生时，函数就会被执行
 * 同时函数中的params参数为广播事件时附带的参数
 */
compiler.plugin("event-name", function (params) {});
```

同理， compilation.apply 和 compilation.plugin 使用方法和上面一致

在开发插件时，你可能会不知道如何下手， 因为你不知道该监听哪个事件才能完成任务

在开发插件时， 还需要注意一下两点

- 只要能拿到 Compiler 或 Compilation 对象，就能广播出新的事件， 所以在新开发的插件中也能广播出事件，
  给其他插件监听使用
- 传给每个插件的 Compiler 和 Compilation 对象都是同一个引用。也就是说在一个插件中修改了 Compiler 或
  Compilation 对象上的属性， 会影响后面的插件
- 有些事件是异步的，这些异步的事件会附带两个参数，第二个参数为回调函数， 在插件处理完任务时
  需要调用回调函数通知 webpack，才会进入下一处理流程

```js
compiler.plugin("emit", function (compilation, callback) {
  // 支持处理逻辑

  // 处理完毕后执行 callback 以通知 Webpack
  // 如果不执行 callback， 运行流程将会一直卡在这里不往下执行

  callback();
});
```

##### 常用 API

读取输出资源、代码块、模块及其依赖， 以便做下一步处理

在 emit 事件发生时， 代表源文件的转换和组装已经完成，在这里可以读取到最终将输出的资源，
代码块，模块及其依赖，并且可以修改输出资源的内容

```js
class Plugin {
  apply(compiler) {
    compiler.plugin("emit", function (compilation, callback) {
      // compilation.chunks 存放所有代码块 是一个数组
      compilation.chunks.forEach(function (chunk) {
        // chunk代表一个代码块
        // 代码块由多个模块组成 通过 chunk.forEachModule 能读取数组代码块的每个模块
        chunk.forEachModule(function (module) {
          // module代表一个模块
          // module.fileDependencies 存放当前模块所有依赖的文件路径，是一个数组
          module.fileDependencies.forEach(function (filePath) {});
        });
      });
      // Webpack 会根据 Chunk去生成输出的文件资源， 每个Chunk都对应一个及其以上的输出文件
      // 例如在 Chunk中包含了 CSS模块 并且使用了 ExtractTextPlugin时
      // 该 Chunk就会生成.js 和 .css两个文件
      chunk.files.forEach(function (filename) {
        // compilation.assets存放当前所有即将输出的资源
        // 调用一个输出资源的 source() 方法能获取到输出资源的内容
        let source = compilation.assets[filename].source()
      })
    });

    // 这是一个异步事件， 要记得调用 callback 通知 webpack本次事件监听处理结束。
    // 如果忘记了调用callback Webpack将一直卡在这里不往后执行
    callback()
  }
}
```
