class Event {
  constructor(options = {}) {
    this.events = {
      
    }
    this.count = options.count || Infinity
    this.currentCount = 0
  }
  
  emit(name, ...args) {
    if(!this.events[name]) {
      return
    }
    this.events[name].forEach(cb => {
      cb.apply(this, args)
    })
    return
  }

  on(name, fn) {
    if(this.count === this.currentCount) {
      console.log('超过了最大监听数！！！')
      return
    }
    if(!this.events[name]) {
      this.events[name] = []
    }
    this.currentCount++
    this.events[name].push(fn)
    return this
  }

  off(name, fn) {
    if(!this.events[name]) {
      return
    }
    this.events[name] = this.events[name].filter(cb => cb !== fn)
    return this
  }

  once(name, fn) {
    function fun(...args) {
      fn.call(this,...args)
      this.off(name, fun) // 执行一次就销毁
    }
    this.on(name, fun)
    return this
  }
}

const e = new Event({count: 3})

e.on('test', a => {
  console.log('1---', a)
})
e.on('test', a => {
  console.log('2---', a)
})
e.once('test', a => {
  console.log('3---', a)
})
e.once('test', a => {
  console.log('3---', a)
})

e.emit('test', 'emit')
e.emit('test', 'emit2')