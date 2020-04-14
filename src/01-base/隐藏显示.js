import React, { Component } from 'react'

import   '../index.css'
export default class App extends Component {
  state = {
    isShow:true,
    isCreate:true
  }
  render() {
    let a = <div>11111111</div>
    let b = <div>22222222</div>
    return (
      <div>
        <div className={this.state.isShow ? 'hide' : ''}>111111</div>
        <button  onClick={this.show}>show/hide</button>
        <button onClick={() => {
          this.setState({
            isCreate:!this.state.isCreate
          })
        }}>create/delete</button>
        {this.state.isCreate?a:b}
      </div>
    )
  }
  show = () => {
    this.setState({
      isShow:!this.state.isShow
    })
  }
}
