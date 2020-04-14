
import React, { Component } from 'react'

export default class Add extends Component {
  name='kobi';
  age=41;
  render() {
    return (
      <div>
        <input type='text' ref='mytext'/>
        <button onClick={() => {
          console.log(this.refs.mytext.value)
        }}>add</button>
        <button onClick={this.handle.bind(this,'aaa','ccc')}>add2</button>
        <button onClick={this.handle3}>button3</button>

        <button onClick={()=> this.handle4('button4')}>button4</button>
      </div>
    )
  };
  handle(x,y){ 

    console.log(x,y,this)
  };

  // 箭头函数　　ｓｓ
  handle3 = () => {
    console.log(this.refs.mytext)
  }
  handle4 = (x) => {
    console.log(this.refs.mytext,x)
  }
}
class Test{
  name='bobo';
  age=33;
}
console.log(new Test().name)