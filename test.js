const obj = {
  count: 0,
  [Symbol.iterator]: () => {
    return {
      next: () => {
       obj.count++
       return count <= 10 ? {done: false, value: obj.count} : {done: true, value: undefined}
      }
    }
  }
}