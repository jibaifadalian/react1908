import React, { useState} from 'react'
const   Context = React.createContext()
function Child1(props) {
  return <Context.Consumer>
    {
      Context => (
        <div>{Context.text}</div>
        
      )
    }
    
  </Context.Consumer>  
}

function Child2(props) {
  return <Child1></Child1>
}
export default function App(props) {
  const [text, settext] = useState("kebi")
  return (
    <Context.Provider value={{text}}>
      
      <Child2/>
    </Context.Provider>
  )
}
