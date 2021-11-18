#### let 和 const

```js
for(var i = 0;i <= 3;i++) {
  setTimeout(function() {
    console.log(i)
  }, 10)
}
```

原因:
1. var定义的变量是全局的， 所以全局只有一个变量i 作用域
2. setTimeout, 下一轮事件循环的时候执行 i = 4， console.log(4) 同步和异步

```js
for(let i = 0;i <= 3;i++) {
  setTimeout(() => {
    console.log(i)
  }, 10)
}
```

1. let引入了块级作用域的概念。 创建setTimeout的时候，变量i只在作用域内生效。 对于循环的每一次， 引用的i都是不同的

2. 变量提升的问题

```js
console.log(i)
var i = 1
```
3. const 
   
#### 箭头函数

1. 箭头函数的this是在什么位置定义决定的. 普通函数的this是在使用的时候决定的
   
2. 简写

```js
const arrowFn = (value) => Number(value)
```

3. 箭头函数不能被用作构造函数

构造函数: 改变this指向， 指向新实例

箭头函数: this是在定义的时候决定的

#### class

```js
class Test {
  _name = ''
  constructor(name) {
    this.name = name
  }
  static getFormatName() {
    return `${this.name} - heheheh`
  }

  get name() {
    return this._name
  }
  
  set name() {
    console.log('检测到了name的赋值操作')
    this._name = val
  }
}
```

#### 模板字符串

编写一个render函数 实现template功能

```js
const year = '2021'
const month = '10'
const day = '01'

const template = '${year}-${month}-${day}'
const context = { year, month, day } // { year: 2021, month: 10,day: 01}
const str = render(template)(context)

console.log(str) // 2020-10-01

function render(template) {
  return function(context) {
    return template.replace(/\$\{(.*?)\}/g, (match, key) => context)
  }
}
```

#### 解构

1. 数组的解构
2. 对象的解构
3. 解构的原理

针对可迭代对象Iterator， 通过遍历按顺序获取对应的值进行赋值

3.1 Iterator是什么?

Iterator是一种接口， interface 为各种不一样的数据解构提供统一的访问机制

任何数据解构只要有Iterator接口

for of 相当于一个遍历器， 遍历数据的时候， 去寻找Iterator

3.2 Iterator 有什么用?

* 为各种不同的数据解构提供统一访问接口
* 数据解构按照顺序处理
* for of可以进行遍历

```js
function gnereateIterator(array) {
  let nextIndex= 0
  return {
    next: () => nextIndex < array.length ? {
      value: array[nextIndex++],
      done: false
    } : {
      value: undefined,
      done: true
    }
  }
}

const iterator = geereateIterator([0, 1, 2])
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
```

3.3 可迭代对象是什么

是Iterator接口的实现.

可迭代对象存在两种协议 可迭代协议 迭代器协议

* 可迭代协议： 对象必须实现iterator方法， 对象或者原型链上必须有一个Symbol.iterator : () => 迭代器协议
* 迭代器协议： 必须实现一个next方法, next方法返回的对象 done value