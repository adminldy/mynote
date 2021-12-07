import React, { Component, createRef } from 'react'

class Sub extends Component {
  input = createRef()
  focus = () => {
    this.input.current.focus()
  }
  render() {
    return <input {...this.props} ref={this.input} />
  }
}

export default class Parent extends Component {
  state = {
    value: ''
  }
  input = createRef()
  onFocus = () => {
    this.input.current.onFocus()  
  }
  onChange = (e) => {
    this.setState({value: e.target.value})
  }
  render() {
    return <Sub
      onChange={this.onChange}
      value={this.state.value}
      ref={this.input}
    >
      <button onClick={this.onFocus}>点击聚焦</button>
    </Sub>
  }
}