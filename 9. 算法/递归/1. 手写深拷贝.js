function deepClone(sourceObj) {
  if(typeof sourceObj !== 'object') return
  let newObj = (sourceObj instanceof Array) ? [] : {}
  for(let key in sourceObj) {
    // 只在当前寻找
    if(sourceObj.hasOwnProperty(key)) {
      if(!(key in newObj)) {
        if(sourceObj[key] instanceof Date) {
          newObj[key] = new Date(sourceObj[key].getTime())
        }else if(sourceObj[key] instanceof RegExp) {
          newObj[key] = new RegExp(sourceObj[key])
        }else if((typeof sourceObj[key] === 'object') && sourceObj[key].nodeType === 1) {
          let newEle = document.getElementsByTagName(sourceObj[key].nodeName)[1]
          newObj[key] = newEle.cloneNode(true)
        }else {
          newObj[key] = (typeof sourceObj[key] === 'object' ? deepClone(sourceObj[key]) : sourceObj[key])
        }
      }
    }
  }
  return newObj
}

// deepClone 函数测试效果
const objA = {
  name: 'jack',
  birthday: new Date(),
  pattern: /jack/g,
  body: document.body,
  others: [123,'coding', new Date(), /abc/gim,]
};

const objB = deepClone(objA);
console.log(objA === objB); // 打印 false
console.log(objA, objB); // 对象内容一样

