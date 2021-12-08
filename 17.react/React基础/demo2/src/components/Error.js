import React, { Component, createRef } from 'react'

const insertErrorBoundary = WrappedComponent => class extends Component {
  state = {
    error: false
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ error: true }, () => {
      logErrorToMyService(error, errorInfo)
    })
  }
  render() {
    if (this.state.error) {
      return <p>页面不可用 请检测组件{Component.displayName}</p>
    }
    return <WrappedComponent {...this.props} />
  }
}

export default insertErrorBoundary