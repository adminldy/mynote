#### 1. npm run build干了什么

1. 找当前package.json下面的 scripts 下面的build这个key， 拿到右边的shell脚本
2. 执行webpack命令
   2.1 第一步先看node_modules\.bin\webpack.cmd是否存在，如果存在的话就执行它
   2.2 如果不存在， 则会执行全局目录下面的webpack.cmd

#### 2. webpack使用图片

1. require('图片路径')
2. 可以在css中通过background-image 引入
3. 可以在html里直接引入(这种方式不推荐)

#### 3. 配置babel插件

```js
   // legacy 旧的意思
   // loose 松散的意思
   ["@babel/plugin-proposal-decorators", {legacy: true}],
   ["@babel/plugin-proposal-class-properties", {loose: true}]
```

#### 4. webpack 分类

pre 前置
normal 正常
inline 内联
post 后置

pre => normal => inline => post

#### source-map

1. 生成单独的source-map文件
2. 包含完整的行和列信息
3. 在目标文件里建立关系， 从而能提示源文件原始位置

#### inline-source-map

- 以base64格式内联在打包后的文件里
- 包含完整的行和列信息
- 在目标文件里建立关系， 从而能提示源文件原始位置
- 不会生成单独的文件

#### hidden-source-map
- 会在外部生成sourcemap, 但是在目标文件并没有建立关联，也不能提示原始错误位置