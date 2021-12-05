function myInstanceOf(obj, type) {
  if(typeof obj !== 'object' || left === null) {
    return false
  }
  while(obj.__proto__) {
    if(obj.__proto__ === type.prototype) {
      return true
    }
    obj = obj.__proto__
  }
  return false
}

let data = {}

let flag = myInstanceOf(data, Array)

console.log(flag)
