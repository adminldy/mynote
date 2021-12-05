class Vue {
  constructor(options) {
    this.$options = options
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    this.$data = typeof options.data === 'function' ? options.data() : options.data || {}
    this._proxyData(this.$data)
    new Observer(this.$data)
  }
  _proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: true,
        get() {
          return data[key]
        },
        set(newVal) {
          if(newVal === data[key]) return
          data[key] = newVal
        }
      })
    })
  }
}