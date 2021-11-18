import React from './react';
import ReactDOM from './react-dom';
// 实现React.createElement方法， 返回一个React元素
let element = React.createElement("div", {
  className: "title",
  style: {
    color: 'red'
  }
}, React.createElement("span", null, "Hello"), "world");
// let element = React.createElement("div", {className: 'title', style: {color: 'red'}}, 
// React.createElement('span', null, 'Hello'), world)
console.log(JSON.stringify(element, null, 2))
// 实现render方法， 把React元素变成真实DOM元素 插入root
ReactDOM.render(element, document.getElementById('root'))

