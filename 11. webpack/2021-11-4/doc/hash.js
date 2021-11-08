function createHash() {
  return require('crypto').createHash('md5') // 创建一个hash对象
}
let depModule1 = 'depModule11'
let depModule2 = 'depModule2'
let entry1 = `require(${depModule1})`
let entry2 = `require(${depModule2})1S`
let entry = {
  entry: entry1,
  entry2: entry2
}
// 如果使用hash，那么它将是工程级别，每修改任何一个文件，所有的文件名都会发生改变
// let hash = createHash().update(entry1).update(entry2).update(depModule1).update(depModule2).digest('hex')
// console.log(hash)

// chunkHash 会根据不同的入口文件，进行依赖文件解析构建对应的hash值
// let entry1ChunkHash = createHash().update(entry1).update(depModule1).digest('hex')
// console.log('entry1ChunkHash', entry1ChunkHash)
// let entry2ChunkHash = createHash().update(entry2).update(depModule2).digest('hex')
// console.log('entry2ChunkHash', entry2ChunkHash)

// contenthash内容 hash
let file1Content = entry1 + depModule1 // 只要内容不变 它的hash值就不会变
let file1Hash = createHash().update(file1Content).digest('hex')
console.log('file1Hash', file1Hash)
let file2Content = entry2 + depModule2
let file2Hash = createHash().update(file2Content).digest('hex')
console.log('file2Hash', file2Hash)
