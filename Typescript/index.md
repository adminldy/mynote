#### 一、 类型

1. 显式注解类型

```js
let name: string = "my name is xiaoming"
let age: number = 38
let hobby: string[] = ["eat", "sleep"]
```
2. 推导类型

```js
let name = "my name is xiaoming" // 是一个string类型
let age = 38 // 是一个number类型
let hobby = ["eat", "sleep"] // 是一个string数组类型
```

#### 二、静态类型
   
1. number

```js
const count: number = 18
const count1 = 18
```

2. string

```ts
const str: string = "xiaoming"
const str1 = "123"
```

3. boolean

```ts
const status: string = false // 显示注解一个string类型
const status1 = true
```
4. null

```ts
const value: null = null
const value1: null = undefined // 这一点null类型和undefined和js里相同
```
5. undefined

```ts
const value: undefined = undefined
const value: undefined = null // 这一点null类型和undefined和js里相同
```
6. void

一般用在函数上， 告诉别人这个函数没有返回值

```ts
function fn(): void {} // 正确

function testFn():void {
  return 1 // 报错
}

function fn1(): void {
  return undefined // 正确
}

function fn2(): void {
  return null // 返回null里欸选哪个也可以，因为null == undefined
}
```

7. never 

never类型永远不会有值。 可以理解为一个永远执行不完的类型

```ts
const test: never = null // 错误
const test1: never = undefined // 错误

function Person(): never { // 正确 死循环 一直执行不完
  while(true) {}
}

function Person(): never { // 正确， 因为递归， 没有出口
  Person()
}

function Person(): never { // 正确 代码报错 执行不下去
  throw Error()
}
```
8. any
   
这个类型代表任何的，任意的

```ts
let value: any = "" // 正确
value = null //正确
```

9. unknown

unknown类型是第二个any类型 也是接受任意类型的值

```ts
let value: unknown = ""
value = 1
value = null
```
区别：

```ts
let valueAny: any = ""
let valueUnknown: unknown = ""

valueAny = "xiaoming"
valueUnknown = "xiaohong"

let status: null = false
status = valueAny // 正确
status = valueUnknown // 报错  不能将unknown类型分配给null类型
```

unknown类型不能赋值给null类型

##### 2. 对象静态类型

1. object && {}

```ts
const list: object = {} // 空对象

const list1: object = null // null对象
```

2. 数组

```ts
const list: [] = [] // 定义一个数组类型
const list1: number[] = [1, 2] // 定义一个数组， 里面值必须是number
const list2: object[] = [null, {}, []] // 定义一个数组里面必须是对象类型
const list3: Array<number> = [1, 2, 3] // 泛型定义数组必须是number类型
```

3. 类
   
```ts
class classPerson = {
  name: "xiaoming"
}

const person: ClassPerson = new Person()
person.xxx = 123 // 运行代码报错
```

4. 函数

```ts
const fn: () => string = () => "123" // 定义一个变量必须是函数类型的， 返回值必须是string类型
```

##### 5. 函数类型注解

1. 函数返回类型为number

```ts
function fn(a, b): number {
  return a + b
}
fn(1, 2)
```

2. 函数void

显示注解为void类型， 函数没有返回值

```ts
function fn(): void {
  console.log(1)
}
```

3. 函数不会自动类型推导

```ts
function testFnQ(a: number, b: number) {
  return a + b
}
testFnQ(1, 2)
```

```ts
function testFnQ(obj: {num: number}) {
  return obj.num
}
testFnQ({num: 18})
```

4. 元组Tuple

用于表示一个已知数组的数量和类型的数组, 定义数组中每一个值的类型

```ts
const arr: [string, number] = ['xiaoming', 1]
```
5. 枚举Enum

```ts
enum color {
  RED,
  BLUE: "blue",
  GREEN: "green"
}

// color["RED"] = 0
// color["BLUE"] = "blue"

```
6. 接口interface

```ts
interface Types {
  name: string,
  age: number
}

const testObj: Types = {name: 'zhangsan', age: 18}

const testObj1: Types = {name: 'xiaoming', age: 22}

```

6.1 readonly修饰符

readonldy类型，只可读状态，不可更改

```ts
interface Types {
  name: string,
  age: number
}

const testObj: Types = {name: 'zhangsan', age: 18}

const testObj1: Types = {name: 'xiaoming', age: 22}

testObj.name = "123" // 无法更改name属性， 因为它是只读属性
```

6.2 ?可选修饰符

```ts
interface Types {
  readonly name: string,
  readonly age: number,
  sex?: string
}

const testObj: Types = {name: 'lisi', age: 19}
```

6.3 extends继承

```ts
interface Types {
  readonly name: string,
  readonly age: number,
  sex?: string
}

interface childrenType extends Types {
  hobby: []
}

const testObj: childrenType = {name: "xiaoming", age: 18, hobby: ['baseketball', 'tennis']}
```

6.4 propName扩展

```ts
interface Types {
  readonly name: string,
  readonly age: number,
  sex?: string,
  [propName: string]: any // propName字段必须是string类型 值是any
}

const testObj: Types = {name: "xiaohong", age: 18, hobby: []}
```

  7. Type

```ts
type Types = string

type TypeUnit = string | number

const name: typeUnit = "abc"
const age: typeUnit = 19
```

7.1 type不支持重复声明, interface支持

```ts
type Types = number

type Types = string // 报错， type不允许出现重复的名字

interface Types1 {
  name: string
}

interface Type1 {
  age: number
}
// interface接口可以出现重复类型名称, 并将他们合并起来
```

7.2 type支持表达式