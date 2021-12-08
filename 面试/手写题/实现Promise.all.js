function PromiseAll(arr) {
  return new Promise((resolve, reject) => {
    let count = 0
    let result = []
    for(let i = 0;i < arr.length;i++) {
      Promise.resolve(arr[i]).then(res => {
        result[i] = res
        count++
        if(count === arr.length) {
          resolve(result)
        }
       }).catch(err => {
        reject(err)
      })
    }
  })
}

let p1 = new Promise((resolve, reject) => {
  resolve(1)
})

let p2 = new Promise((resolve, reject) => {
  resolve(2)
})

let p3 = new Promise((resolve, reject) => {
  resolve(3)
})

let promiseArr = [p1, p2, p3]

let pAll = PromiseAll(promiseArr)

console.log(pAll)