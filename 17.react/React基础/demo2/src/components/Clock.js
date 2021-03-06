import React, { Component } from 'react'

export default class Clock extends Component {
  state = {
    date: new Date()
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        date: new Date()
      })
    }, 1000)  
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }
  
  render() {
    return <div>
      { this.state.date.toLocaleTimeString() }
    </div>
  }
}