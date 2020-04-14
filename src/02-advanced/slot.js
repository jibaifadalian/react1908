import React, { Component } from 'react'

class Child1 extends  Component{
  render() {
  return <div>child1  {this.props.children}</div>
  }
}
export default class App extends Component {
  render() {
    return (
      <div>
        <Child1>
          <div>111111111</div>
        </Child1>
      </div>
    )
  }
}
