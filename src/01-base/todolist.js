import React, { Component } from 'react'

export default class App extends Component {
  state = {
    name:"kebi",
    mytext:'',
    list:['大连','沈阳']
  }
  render() {
    return (
      <div>
        <div>
          <input type='text' onChange={this.vulueChange} value={this.state.mytext} ref='text' />
          <button onClick={this.addList}>add</button>
          {
            this.state.list.map((item,index) => {
              return <li key={index}>
                {item}
                <button onClick={() => this.deleteItem(index)}>delete</button>
              </li>
                    
            })
          }
        </div>
      </div>
    )
  }
  vulueChange = (e) => {
    this.setState({
      mytext: e.target.value
    })
  }
  addList = () => {
    console.log(this.refs.text.value)
    this.setState({
      list:[...this.state.list,this.state.mytext],
      mytext:""
    })
  }
  deleteItem = (index) => {
    let newlist = this.state.list.slice()
    newlist.splice(index,1)
    this.setState({
      list: newlist
    })
    console.log(this.state.list)
  }
}
