import React, { Component, createRef } from 'react'

const insertLog = WrappedComponent => class extends Component {
  state = {
    count: 0
  }
  onClick = () => {
    this.setState({count: this.state.count + 1})
  }
  componentDidUpdate(...args) {
    console.log(...args)
  }
  render() {
    return <WrappedComponent {...this.props} onChange={this.onClick} count={this.state.count}></WrappedComponent>
  }
}

class Course extends Component {
  render() {
    return (
      <div>
        Course <button onClick={this.props.onChange}>更新{this.props.count}</button>
      </div>
    )
  }
}

const BaseWithLog = insertLog(Course)

export default BaseWithLog