const loaderUtils = require('loader-utils')
module.exports = function(source) {
  const options = loaderUtils.getOptions(this)
  // 异步loader
  const asyncfunc = this.async()
  setTimeout(() => {
      source += '走上人生颠覆'
      asyncfunc(null, source)
  }, 200)
}