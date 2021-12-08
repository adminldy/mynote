const obj = {
  count: 0,
  [Symbol.iterator]: () => {
    return {
      next: () => {
        obj.count++
        if(obj.count <= 10) {
          return {
            done: false,
            value: obj.count
          }
        }else {
          return {
            done: true,
            value: undefined
          }
        }
      }
    }
  }
}

for(let item of obj) {
  console.log(item)
}