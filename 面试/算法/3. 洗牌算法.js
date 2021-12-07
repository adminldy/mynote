function getTenNum(testArray, n) {
  const cloneArr = [...testArray]
  let result = []
  for(let i = 0;i < n;i++) {
    // 取一个随机数，在数组长度范围内的 因为可能取到任意一个
    const random = Math.floor(Math.random() * cloneArr.length)
    // 获取一个数组里的数
    const cur = cloneArr[random]
    // 把他推入到result数组里
    result.push(cur)
    // 把这个数从cloneArr里面删掉， 以防下次再取到她
    cloneArr.splice(random, 1)
  }
  return result
}

let arr = getTenNum([1,2,3,4,5,6,7,8,9], 8)

console.log(arr)
