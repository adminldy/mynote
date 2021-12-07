import { Component } from "react";

const insertLog = (WrappedComponent) => class BaseWithLog extends Component {
  componentDidUpdate(...args) {
    console.log(...args)
  }
  state = {
    count: 1
  }
  onClick = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return <WrappedComponent {...this.props} onChange={this.onClick} count={this.state.count}></WrappedComponent>
  }
}

class Course extends Component {
  render() {
    return (
      <div>
        Course <button onClick={this.props.onChange}>点击</button>
      </div>
    )
  }
}

const BaseWithLog = insertLog(Course)

export default BaseWithLog