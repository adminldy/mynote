const refValue = ref(0) // 包装基本值为一个类

effect(function fn() { // 命名为fn, 便于下文跟踪
  console.log(refValue.value)
})

/** 模拟一个用户的动 */ 
refValue.value++

// 上面是开发者的代码
// 背后的逻辑

{
  let activeEffect
  function ref(init) {
    class RefImpl {
      constructor(init) {
        this._value = init
      }
      get value() {
        trackRefValue(this) // 依赖收集
        return this._value
      }
      set value(newVal) {
        this._value = newVal
        triggerRefValue(this, newVal)
      }
    }
    return new RefImpl(init)
  }
  function trackRefValue(refValue) {
    if(!refValue.dep) {
      refValue.dep = new Set()
    }
    refValue.dep.add(activeEffect) 
  }
  function triggerRefValue(refValue) {
    [...refValue.dep].forEach(effect => effect.fn())
  }
  function effect(fn) {
    activeEffect = new ReactiveEffect(fn)
    fn()
  }
  class ReactiveEffect {
    constructor(fn) {
      this.fn = fn
    }
    run() {
      this.fn()
    }
  }
}