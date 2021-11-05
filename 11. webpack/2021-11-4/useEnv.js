// env文件名
const dotenvFile = '.env'
let envContent = require('fs').readFileSync('./.env')
// 使用dotenv模块读取文件内容，生成process.env对象
// require('dotenv-expand')(
//   require('dot-env').config({
//     path: dotenvFile
//   })
// )
console.log(envContent)
console.log(process.env)