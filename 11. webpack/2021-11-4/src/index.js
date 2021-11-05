// 返回值是图片拷贝后的目标路径名
// import './logo.css'
// let imageSrc = require('./images/jqm.png')
// let img = new Image()
// img.src = imageSrc
// document.body.appendChild(img)
/**
 * 
 * @param {*} target 装饰的目标
 * @param {*} key 属性名 PI
 * @param {*} descriptor 属性描述器
 * writable enumerable configurable value
 */
// function readonly(target, key, descriptor) {
//   descriptor.writable = false // 不可更改值
// }

// class Person {
//   @readonly
//   PI = 3.14
// }

// let p = new Person()
// p.PI = 3.15

import React from 'react'
import ReactDOM from 'react-dom'
let element = <h1>ReactDOM</h1>
ReactDOM.render(element, document.getElementById('root'))