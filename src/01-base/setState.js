import React, { Component } from 'react'

export default class setState extends Component {
  state = {
    name:'kebi',
    count:1
  }
  render() {
    return (
      <div>
  <div>{this.state.name}----------------{this.state.count}</div> 
        <button onClick={this.changeName}>click1</button>
        <button onClick={this.changeName2}>click2</button>
        <button onClick={this.addcount}>addcount</button>
        <button onClick={this.addcount2}>addcount2</button>
      </div>
    )
  }
  changeName = () => {
    this.setState({
      name:'JACK'
    },() => {
      console.log(this.state.name)
    })
    console.log(111,this.state.name)
  }
  changeName2 = () => {
    this.setState((prevState) => {
      return {
        name:'james'
      }
    })
    
  }
  addcount = () => {
    this.setState({
      count:this.state.count + 1
    })

    this.setState({
      count: this.state.count + 1
    })
   
  }
  addcount2 = () => {
    this.setState((prevState) => {
      console.log(prevState)
      return {
        count:prevState.count + 1
      }
    })
    console.log(this.state.count)
    /** prevState为上一次状态(state)*/
    this.setState((prevState) => {
      console.log(prevState)
      return {
        count: prevState.count + 1
      }
    })
    console.log(this.state.count)
  }
}
