import React, { Component } from 'react'
import typeProps from 'prop-types'
class Navbar extends Component {
  static propTypes = {
    show:typeProps.bool,
  }
  static defaultProps = {
    show: true
  }
  render() {
    return <div>
      <button>back</button>
      Navbar----------{this.props.mytitle}
      {
        this.props.show ? <button>list</button> : null
      }
    </div>
  }
}

// Navbar.propTypes = {
//   show:typeProps.bool
// }定义类属性  类可以直接访问  对象属性，实例才可以访问
export default class App extends Component {
 
  render() {
    let obj = {
      title: "今日关注",
      show: true
    }
    return (
      <div>
        <Navbar mytitle="home" show={false}></Navbar>
        <Navbar mytitle="list" ></Navbar>
        <Navbar {...obj}></Navbar>
      </div>
    )
  }
}




