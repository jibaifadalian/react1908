import React, { Component } from 'react'

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVlue:'',
      list:['zhangsan']
    }
  }
  // state = {
  //   name:'kebi',
  //   age:41,
  //   list:['张三','李四']
  // }
  render() {
    return (
      <div>
        <input type='text' ref='mytext'/>
          <button onClick={this.changeName}>changeName</button>
        <div>
          {this.state.list.map(item =>
            <li key={item}>{item}</li>
          )}
        </div>
      </div>
      
    )
  }
  changeName = () => {
    this.setState({
      list:this.state.list.concat(this.refs.mytext.value)
    })
  }
}
