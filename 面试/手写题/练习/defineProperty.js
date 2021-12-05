const reactive = (obj) => {
  if(typeof obj === 'object' && obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}

const defineReactive = (obj, key, value) => {
  reactive(value)
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', value)
      return value
    },
    set(newVal) {
      if(newVal === value) return
      reactive(newVal)
      value = newVal
      console.log('set', newVal)
    }
  })
}

const data = {
  a: 1,
  b: 2,
  c: {
    c1: {
      af: 999
    },
    c2: 3
  }
}

reactive(data)

data.a

data.c.c1 = {
  bc: 123
}

console.log(data)