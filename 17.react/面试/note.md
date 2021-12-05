#### 一、为什么引入 JSX

- 需要实现声明式
- 代码结构需要非常清晰和简洁， 可读性强
- 结构， 样式和事件可以放在一起
- 不想引入新的概念和语法 只写 JS

#### 二、 JSX 工作原理

babel 通过@babel/plugin-transform-react-jsx 这个插件 把 JSX 语法转换成
React.createElement()的形式

例

```js
const babel = require('@babel/core')
const sourceCode = `<h1 id="adb">world</h1>`
const result = babel.transform(sourceCode, {
  // classic 老的转换 automatic 新的转换
  plugins: [["@babel/plugin-transform-react-jsx", {runtime: 'classic'}]]
})
console.log(result.code)
=>
// 老：
// 第一个参数是类型， 第二个参数是属性， 第三个往后是子元素
//result.code:
// React.createElement("h1", {
//   id: "adb"
// }, "world");

// 新:
// _jsx("h1", {
//   id: "adb",
//   children: "world"
// });
```

区别： 老的需要引入 React 变量，而新的不需要

#### 三、说一下对 virtual dom 的理解

用来描述 jsx 对象的

```js
import { REACT_TEXT } from "./constants";
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === "object" ? child : createTextDom(child);
      }),
    },
  };
}

function createTextDom(text) {
  return {
    type: REACT_TEXT,
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
```

#### 四、类组件和函数组件

```js
export function Component(props) {
  this.props = props;
}

Component.prototype.isReactComponent = {};

// class Component {
//   static isReactComponent = true;
//   constructor(props) {
//     this.props = props
//   }
// }
```

相同点： 它们都可以接收属性并返回 React 元素

不同点：

1.  类组件需要创建实例，函数组件不需要
2.  类组件需要创建并保存实例， 会占用一定内存， 函数组件不需要创建实例， 可以节约内存
3.  捕获特性， 函数组件具有值捕获特性 (引用之后会指向老的值)
4.  可测试性： 函数组件更方便编写单元测试
5.  状态： 类组件有自己的实例， 可以定义状态，函数组件可以使用 useState 使用状态
6.  逻辑复用：
7.  跳过更新： 类组件 shouldComponentUpdate 函数组件 useMemo

```js
let classComponent = new ClassComponent();
let FunctionComponent = FucntionComponent(props);
```

#### 五、请说一下 React 的渲染流程

##### 设计理念：

1. 异步可中断 把大任务分为一个个小任务， 在每个时间片里执行
2. 增量更新

##### requestIdleCallback

- 我们希望快速响应用户， 让用户觉得够快， 不能阻塞用户的交互
- requestIdleCallback 使开发者能够在主事件循环上执行后台和低优先级工作， 而不会影响延迟关键事件， 如动画和输入响应
- 正常帧任务完成后没超过 16ms 说明事件有富余， 此时就会执行 requestIdlecallback 里注册的任务
