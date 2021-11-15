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
- @babel/preset-env只转换新的语法， 不转换API和方法
- 只转换最新ES语法： 比如 箭头函数
- 不转换
   - 最新ES API ， 比如Promise
   - 最新ES实例方法 比如 String.prototype.includes

#### loader

