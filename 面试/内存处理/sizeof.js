let seen = new WeakSet()

function sizeOfObject(obj) {
  if(obj === null) return 0
  const keys = Object.keys(obj)
  let bytes = 0
  for(let i = 0;i < keys.length;i++) {
    if(typeof obj[keys[i]] === 'object' && obj[keys[i]] !== null) {
      if(seen.has(obj[keys[i]])) {
        continue
      }
      seen.add(obj[keys[i]])
    }
    bytes += calculator(keys[i])
    bytes += calculator(obj[keys[i]])
  }

  return bytes
}

function calculator(object) {
  const objectType = typeof object
  switch(objectType) {
    case 'string': 
      return object.length * 2
    case 'number': 
      return 8
    case 'boolean':
      return 4
    case 'object':
      if(Array.isArray(object)) {
        return object.map(calculator).reduce((prev, cur) => {
          return prev + cur
        }, 0)
      } else {
        return sizeOfObject(object)
      }
    default: {
      return 0;
    }
  }
}

const testData = {
  a: 111,
  b: 'ccc',
  2222: false,
  d: {
    s: ['1', '2', '3']
  }
}

console.log(calculator(testData))