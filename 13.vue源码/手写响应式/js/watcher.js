class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    Dep.target = this
    // vm[key] 会触发get方法 通过dep.addSub(Dep.target) 添加到 dep.subs
    this.oldValue = vm[key]
    Dep.target = null
  }
  update() {
    console.log('update')
    let newVal = this.vm[this.key]
    this.cb(newVal)
  }
}