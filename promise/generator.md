### 概念
Generator是一个状态机，封装了多个内部状态

执行Generator函数会返回一个遍历器对象，Generator函数除了状态机，还是一个遍历器对象生成函数。
返回的遍历器对象，可以一次遍历Generator函数内部的每一个状态

例子
```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();

// 通过遍历器对象的next方法，使得指针移向下一个状态
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

### yield表达式

由于Generator函数返回的遍历器对象， 只有调用next方法才会遍历下一个内部状态， 所以提供了一种可以暂停执行的函数。 yield表达式就是暂停标志

遍历器对象的next方法运行逻辑如下

(1) 遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值

(2) 下一次调用next方法时， 再继续往下执行， 直到遇到下一个yield表达式

(3) 如果没有在遇到新的yield表达式， 就一直运行到函数结束， 直到return 语句为止， 并将return语句后面的表达式的值， 作为返回的对象的value属性值

(4) 如果该函数没有return语句， 则返回对象的value值为undefined

### next方法的参数

yield表达式本身没有返回值， 或者说总是返回undefined。 next方法可以带一个参数， 该参数就会被当作**上一个**yield表达式的返回值

```js
function* f() {
  for(var i = 0; true; i++) {
    var reset = yield i;
    if(reset) { i = -1; }
  }
}

var g = f();

g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }
```