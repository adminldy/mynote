document.addEventListener('click', () => {
  import('./title').then(result => {
    console.log(result.default)
  })
})
// import加载的代码块的chunkId是如何计算的
// 得到加载模块的相对根目录的相对路径 ./src/title/js
// ./ / 和 .转换成下划线 src_title_js chunkId