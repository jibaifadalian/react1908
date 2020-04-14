import React, { Component } from 'react'

export default class App extends Component {
  state = {
    list:[]
  }
  render() {
    console.log('render')
    return (
      <div>
        {this.state.list.map(item => (
           <li key={item.id}>
             {item.nm}
             <img src={item.img.replace('w.h','128.180')}/>
          </li>
        ))}
      </div>
    )
  }
  componentWillMount() {
    console.log('componentWillMount')
    fetch('/test.json').then(res => res.json()).then(res => {
      console.log(res)
      this.setState({
        list:res.coming
      })
    })
  }
  componentDidMount() {
    console.log('componentDidMount')
  }

}
