import React,{useReducer,useContext} from 'react'
import reducer from '../store/reducers/isShowReducer'
import axios from 'axios'
const GolbalContext = React.createContext();

const Child1 = (props) => {
  let { state, dispatch } = useContext(GolbalContext)
  return <div>Child1-----{state.text}___{props.mytext}
  <button onClick={() => {
    dispatch({
      type:'change_text',
      payload:'child1更改后的text'
    })
  }}>change</button>
  </div>
}

const Child2 = (props) => {
   //获取公共state
  let { state, dispatch } = useContext(GolbalContext);
  const getData = () => {
    axios.get("/articles").then(res => {
      dispatch({
        type:'child2_getData',
        payload:res.data
      })
    })
  }
  return <div>
    Child2__ {props.children}
    {state.list.map(item => <li key={item.title}>{item.title}</li>)}
    <button onClick={getData}>child2</button>
    </div>
}

export default function Home() {
  /**useReducer返回一个数组，第一个是公共状态，第二个成员是改变状态的方法 */
  const [state,dispatch] = useReducer(reducer,{
    isShow:false,
    text:"i am public text",
    list:[]
  })
  
  return (
    <GolbalContext.Provider value={{
      state,
      dispatch
    }}>
      <Child1 mytext='child props'/>
      
      <Child2>111111</Child2>
    </GolbalContext.Provider>
  )
}
