function promiseAllSettle(promiseArr) {
  return new Promise((resolve, reject) => {
    if(!Array.isArray(promiseArr)) {
      throw 'promiseArr必须是数组'
    }
    const res = []
    let count = 0
    let length = promiseArr.length
    for(let i = 0;i < length;i++) {
      Promise.resolve(promiseArr[i]).then((value) => {
        res[i] = {
          status: 'fulfilled',
          value
        }
      }).catch((err) => {
        res[i] = {
          status: 'rejected',
          err
        }
      }).finally(() => {
        count++
        if(count === length) {
          resolve(res)
        }
      })
    }
  })
}