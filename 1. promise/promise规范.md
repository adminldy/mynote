# PromiseA+规范

## 术语

1. promise 是一个有then方法的对象或者函数. 行为遵循本规范
2. thenable 是一个有then方法的对象或者函数.
3. value 是promise状态成功时的值， 也就是resolve的参数. 类型可以是undefined / thenable promise, number, boolean,
string, object
4. reason 是promise状态失败时的值， 也就是reject的参数， 表示的拒绝的原因
5. exception 是一个使用throw抛出的异常值

## 规范

### Promise States

promise应该有三种状态， 注意他们之间的流转关系

1. pending

  1.1 初始的状态， 可改变
  1.2 一个Promise在resolve和reject之前 都处于这个状态
  1.3 resolve -> fulfilled
  1.4 reject -> rejected

2. fulfilled

  2.1 最终态， 不可改变
  2.2 一个promise被resolve后变成这个状态
  2.3 必须拥有一个value值

3. rejected

  3.1 最终态， 不可改变
  3.2 一个promise被reject后变成这个状态
  3.3 必须拥有一个reason值

pending -> resolve(value) -> fulfilled
pending -> reject(reason) -> rejected

### then

promise 应该提供一个then方法， 用来访问最终的结果

```js
promise.then(onFulfilled, onRejected)
```

1. 参数要求

  1.1 onFulfilled 必须是函数类型， 如果不是函数， 应该被忽略
  1.2 onRejected 必须是函数类型， 如果不是函数， 应该被忽略

2. onFulfilled 特性

  2.1 在 promise 变成 fulfilled 时， 应该调用 onFulfilled， 参数是value
  2.2 在 promise 变成 fulfilled 之前， 不应该被调用
  2.3 只能被调用一次(可能需要一个变量来限制执行次数)

3. onRejected 特性

  2.1 在 promise 变成 rejected 时， 应该调用 onRejected， 参数是reason
  2.2 在 promise 变成 rejected 之前， 不应该被调用
  2.3 只能被调用一次(可能需要一个变量来限制执行次数)

4. onRejected 和 onFulfilled 应该是微任务

queueMicrotask 来实现微任务的调用

5. then 方法可以被调用多次

  5.1 promise变成fulfilled后， 所有 onFulfilled 回调都需要按照then的顺序执行(用数组来存放onFulfilled list)
  5.2 promise变成rejected后， 所有 onRejected 回调都需要按照then的顺序执行(用数组来存放onRejected list)

6. then的返回值

  then应该返回一个promise
  
  ```js
  promise2 = promise1.then(xx, xxx)
  ```

  6.1 onFulfilled 或者 onRejected 执行结果为x, 调用 resolvePromise 方法
  6.2 如果onFulfilled 或者 onRejected 执行时抛出异常e，promise2需要被reject
  6.3 如果 onFulfilled 不是一个函数， promise2 以 promise1 的value 触发 fulfilled 
  6.4 如果 onRejected 不是一个函数， promise2 以 promise1 的reason 触发 fulfilled 

7. resolvePromise

  ```js
  resolvePromise(promise2, x, resolve, reject)
  ```

  7.1 如果 promise2 和 x 相等, 那么reject typeError
  7.2 如果 x 是一个promise 
      如果 x 是 pending, promise一定继续pending, 直到x变成fulfilled 或者 rejected
      如果 x 是 fulfilled， resolve same value
      如果 x 是 rejected， reject same reason
  7.3 如果 x 是一个普通的值
      resolve(x)
      