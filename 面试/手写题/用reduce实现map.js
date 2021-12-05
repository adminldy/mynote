Array.prototype._map = function(fn, thisArg) {
  // 定义初始数组
  const result = []
  // 用reduce方法 执行每一次fn 并把当前的数组对应的值传给函数 每次执行完都会为result内的元素重新赋值
  this.reduce((prev, cur, i, arr) => {
    result[i] = fn.call(thisArg, arr[i], i, arr)
  }, 0)
  return result
}

let arr = [1,2,3,4]

let arr2 = [3, 4, 5]

let newArr = arr._map(function(item, index) {
  return item + index + this.length
}, arr2)

console.log(newArr)