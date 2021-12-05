class Observer {
  constructor(data) {
    this.walk(data)
  }
  walk(data) {
    if(!data || typeof data !== 'object') return
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(data, key, value) {
    // 如果value也是对象 那么也要设置响应式
    this.walk(value)
    let self = this
    let dep = new Dep()
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log('get')
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set(newVal) {
        if(newVal === value) return
        self.walk(newVal) 
        value = newVal
        dep.notify()
      }
    })
  }
}