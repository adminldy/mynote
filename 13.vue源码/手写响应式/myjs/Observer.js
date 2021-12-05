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
  this.walk(value)
  Object.defineProperty(data, key, {
    get() {
      return value
    },
    set(newVal) {
      if(newVal === value) return
      console.log(this)
      value = newVal
    }
  })
 }
}