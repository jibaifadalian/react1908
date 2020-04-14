import React, { PureComponent ,Component} from 'react'
class Nav extends Component {
  /**如果shouldComponentUpdate不进行拦截，父组件调用
   * 一次setState该钩子就会调用一次，不改变状态也会调用 */
  componentWillReceiveProps(nextProps) {
    console.log('获取ajax', nextProps.myname)
  }
  componentDidMount() {
    // console.log('componentDidMount',this.props.myname)
  }
  render(h) {
    return <div>nav ----{this.props.myname}</div>
  }
}
export default class App extends PureComponent {
  state = {
    name: 'bobo'
  }
  componentWillUpdate() {
    console.log('willupdate')
  }
  componentDidUpdate() {
    console.log('componentDidUpdate')
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(this.state.name, nextState)
  //   if (this.state.name !== nextState.name) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }
  render() {
    return (
      <div>
        <Nav myname={this.state.name} />
        <div>{this.state.name}</div>
        <button onClick={() => {
          this.setState({
            name: 'kebi'
          })
        }}>change</button>
      </div>
    )
  }
}
