const loaderUtils = require('loader-utils')
module.exports = function(source) {
  const options = loaderUtils.getOptions(this)
  console.log(options)
  source += options.message
  this.callback(null, source)
}