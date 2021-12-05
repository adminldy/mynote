function render(key, val) {
  console.log(`key ---- ${key}, value ---- ${val}`)
}

const defineReactive = (obj, key, val) => {
  reactive(val)
  Object.defineProperty(obj, key, {
    get() {
      console.log(val)
      return val
    },
    set(newVal) {
      if(newVal === val) return
      reactive(newVal)
      val = newVal
      render(key, val)
    }
  })
}

const reactive = (obj) => {
if(typeof obj === 'object' && obj) {
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}
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

console.log(data.c.c1)

data.b = 3