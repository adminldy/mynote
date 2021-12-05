// 实现基于proxy的响应式 能够监听属性的删除操作 
let observeStore = new Map()

function makeObservable(target) {
  let handlerName = Symbol('handler')
  observeStore.set(handlerName, [])
  target.observe = function(handler) {
    observeStore.get(handlerName).push(handler)
  }
  const proxyHandler = {
    get(target, property, receiver) {
      if(typeof target[property] === 'objec t' && target[property] !== null) {
        return new Proxy(target[property], proxyHandler)
      }
      
      let success = Reflect.get(...arguments)
      console.log('success', success)
      if(success) {
        observeStore.get(handlerName).forEach(handler => handler('GET', property, target[property]))
      }
      return success
    },
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments)
      if(success) {
        observeStore.get(handlerName).forEach(handler => handler('SET', property, value))
      }
      return success
    },
    deleteProperty(target, property) {
      let success = Reflect.deleteProperty(...arguments)
      if(success) {
        observeStore.get(handlerName).forEach(handler => handler('DELETE', property))
      }
      return success
    }
  }
  return new Proxy(target, proxyHandler)
}

let user = {}

user = makeObservable(user)

user.observe((action, key, value) => {
  console.log(`${action} key=${key} value=${value || ''}`)
})

user.name = "John"

console.log(user.name)

delete user.name