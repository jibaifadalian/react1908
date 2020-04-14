import React from 'react';

 class Child extends React.Component{
  render(h) {
   return  <div>
     {10 + 20}
     <div style={{background:'red'}}>child</div>
   </div>
    // return 
  }
}
/**react@16.8之前函数式组件 不支持状态 **/
/**react@16.8之后react Hooks 支持状态 */
function Child2(params) {
  return <div>child2</div>  
}
export default class HelloWorld extends React.Component {
  render(h) {
    return (
      <div>
        <div className='hello'>hellow HelloWorld</div>
        <div>wwwwwwwww</div>
        <Child></Child>
        <Child2></Child2>
      </div>
    )
  }
}

