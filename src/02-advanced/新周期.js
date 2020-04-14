import React, { Component } from 'react'
class List extends Component{
  state = {
    mytext:'11111'
  }
  static getDerivedStateFromProps(nextProps,state) {
    /**返回值作为新的状态  nextProps为父组件传递过来的属性（类型对象）*/
    document.title = nextProps.title
  /**修改状态将属性转化为状态 */
    return {
      mytext:nextProps.id
    }
    /**不修改状态 */
    return null
  }
  componentDidUpdate() {
    /**处理异步 */
    setTimeout(() => {
      console.log(this.state.mytext) 
    }, 1000);
  }
  render(){
  return <div>{this.props.id}----{this.state.mytext}</div>
  }
}
export default class App extends Component {
  state={
    id:0
  }
  render() {
    return (
      <div>
        <ul>
          <li onClick={() => {
            this.setState({
              id:1
            })
          }}>111</li>
          <li onClick={() => {
            this.setState({
              id: 2
            })
          }}>222</li>
          <List id={this.state.id} title='我爱你小红果'/>
        </ul>
      </div>
    )
  }
}
