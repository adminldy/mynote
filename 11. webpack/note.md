#### 1. npm run build干了什么

1. 找当前package.json下面的 scripts 下面的build这个key， 拿到右边的shell脚本
2. 执行webpack命令
   2.1 第一步先看node_modules\.bin\webpack.cmd是否存在，如果存在的话就执行它
   2.2 如果不存在， 则会执行全局目录下面的webpack.cmd