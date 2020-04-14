import React, { Component } from 'react'

const observer = {
  list:[],
  subscribe(callback) {
    this.list.push(callback)
  },
  dispatch(mes) {
    /**遍历数组，执行每个函数 */
      this.list.forEach(callback => callback(mes))
  }
}
class Child1 extends Component {
  render() {
    return <div>Child1订阅者</div>
  }
  /**挂载完成  先进行订阅传递回调函数  */
  componentDidMount() {
    observer.subscribe((mes) => {
      console.log('child1订阅',mes)
    })
  }
}
class Child2 extends Component {
  render() {
    return <div>
              <div>Child2发布者</div>
              <button onClick={this.handleClick}>child2</button>
           </div>
    
  }
  handleClick = () => {
    /**发布者调用dispatch */
    observer.dispatch('来自child2的问候')
  }
}
export default class App extends Component {
  render() {
    return (
      <div>
        <Child1/>
        <Child2/>
      </div>
    )
  }
}
