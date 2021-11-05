let p = {name: 'ldy'}
Object.defineProperty(p, 'age', {
  value: 10,
  configurable: true, // 此字段是否可以删除
  enumerable: true // for in循环的时候是可以打印的
})