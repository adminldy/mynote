enum Promise_STATUS {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}
class MyPromise {
  _status: Promise_STATUS = Promise_STATUS.PENDING
  value = null
  reason = null
  fulfilled_callbacks = []
  rejected_callbacks = []
  constructor(fn: Function) {
    try {
      fn(this.resolve.bind(this), this.reject.bind(this))
    } catch(e) {
      this.reject(e)
    }
  }
  
  get status() {
    return this._status
  }

  set status(newStatus) {
    this._status = newStatus
    switch (newStatus) {
      case Promise_STATUS.FULFILLED:
        this.fulfilled_callbacks.forEach(cb => {
          cb(this.value)
        })
        break;
      
      case Promise_STATUS.REJECTED: 
        this.rejected_callbacks.forEach(cb => {
          cb(this.reason)
        })
        break;
    }
  }

  resolve(value) {
    if(this.status === Promise_STATUS.PENDING) {
      this.value = value
      this.status = Promise_STATUS.FULFILLED
    }
  }

  reject(reason) {
    if(this.status === Promise_STATUS.PENDING) {
      this.reason = reason
      this.status = Promise_STATUS.REJECTED
    }
  }

  isFunction(param) {
    return typeof param === 'function'
  }

  then(onFulfilled?: Function, onRejected?: Function) {
    const relyOnFulfilled = onFulfilled ? onFulfilled : (val) => val

    const relyOnRejected = onRejected ? onRejected : (err) => {
      throw err
    }

    const promise2: MyPromise = new MyPromise((resolve: Function, reject: Function) => {
      const fulfilledFn = () => {
        queueMicrotask(() => {
          try {
            const x = relyOnFulfilled(this.value)
            this.resolvePromise(promise2, x, resolve, reject)
           }catch(e) {
             reject(e)
           }
        })
      }

      const rejectedFn = () => {
        queueMicrotask(() => {
          try {
            const x = relyOnRejected(this.reason)
            this.resolvePromise(promise2, x, resolve, reject)
          }catch(e) {
            reject(e)
          }
        })
      }

      switch (this.status) {
        case Promise_STATUS.FULFILLED:
          fulfilledFn()
          break;
        
        case Promise_STATUS.REJECTED: 
          rejectedFn()
          break;
        
        case Promise_STATUS.PENDING: 
          this.fulfilled_callbacks.push(fulfilledFn)
          this.rejected_callbacks.push(rejectedFn)
          break;
      }
    })

    return promise2
  }

  resolvePromise(promise2, x, resolve, reject) {
    if(promise2 === x) {
      return reject(TypeError('promise2 equal x'))
    }
    
    if(x instanceof MyPromise) {
      x.then(y => this.resolvePromise(promise2, y, resolve, reject), reject)
    }else {
      resolve(x)
    }
  }
}

const p1 = new MyPromise((resolve, reject) => {
  resolve(123)
})

const p2 = p1.then(() => {
  return new MyPromise((resolve,reject) => {
    resolve(345)
  })
})

console.log(p2)