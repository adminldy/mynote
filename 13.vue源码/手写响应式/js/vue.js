class Vue {
  constructor(options) {
    this.$options = options
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    this.$data = options.data || {}
    this._proxyData(this.$data)
    new Observer(this.$data)
    new Compiler(this)
  }
  // 将data中的属性代理到vue实例身上
  _proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(newVal) {
          if(data[key] === newVal) return
          data[key] = newVal 
        }
      })
    })
  }
}