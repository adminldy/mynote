function* test() {
  let length = 3
  for(let i = 0;i < length;i++) {
      const x = yield new Promise(resolve => {
        setTimeout(() => {
            resolve(1000);
        }, 1000);
    })
    console.log(x)
  }
}
const iterator = test() //迭代器
const r1 = iterator.next(1000)
console.log(r1)
const r2 = iterator.next()
console.log(r2)
const r3 = iterator.next()
console.log(r3)
const r4 = iterator.next()
console.log(r4)

