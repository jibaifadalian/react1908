import React, { Component } from 'react'

export default class App extends Component {
  state = {
    name:"kebi"
  }
  render() {
    console.log('render')
    return (
      <div>
        {this.state.name}
        <button onClick={() => {
          this.setState({
            name:'xiaoming'
          })
        }}>click</button>
      </div>
    )
  }
  componentWillUpdate() {
    console.log('componentWillUpdate')
  }
  getSnapshotBeforeUpdate() {
    return {
      y:100
    }
  }
  componentDidUpdate(preProps,preState,data) {
    console.log("componentDidUpdate",data)
  }
}
