import React, { Component } from 'react'
class NavBar extends Component {
  render(h) {
    return (
      <div style={{ background: 'red' }}>
        <button>NavBar</button>
        <li>11111</li>
        <li>11111</li>
      </div>
    )
  }
}
class SideBar extends Component {
  render(h) {
    return (
      <div>
        <button onClick={this.handleClick}>SideBar</button>
      </div>
    )
  }
  handleClick = () => {
    this.props.event()
  }
}
export default class App extends Component {
  state = {
    isShow: true
  }
  render() {
    return (
      <div>
        <SideBar event = {() =>  {
          this.setState({ isShow: !this.state.isShow })
        } }></SideBar>
        {
          this.state.isShow ? <NavBar ></NavBar> : null
        }
        
      </div>
    )
  }
}
