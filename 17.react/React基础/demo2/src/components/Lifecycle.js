import React, {Component, component} from 'react'

export default class LifeCycle extends Component {
  constructor(props) {
    super(props)
    console.log('1. 组件构造函数执行')
  }
  componentWillMount() {
    console.log(`2. 组件将要挂载`)
  }
  componentDidMount() {
    console.log('3. 组件已经挂载')
  }
  componentWillReceiveProps() {
    console.log('4. 将要接收属性传递')
  }
  shouldComponentUpdate() {
    console.log('5. 组件是否需要更新?')
  }
  componentWillUpdate() {
    console.log('6. 组件将要更新')
  }
  componentDidUpdate() {
    console.log('7. 组件已更新')
  }
  componentWillUnmount() {
    console.log('8. 组件将要卸载')
  }
  render() {
    console.log('组件渲染')
    return <div>生命周期</div>
  }
}