/**导入路由模块 */
import React from 'react'
import {
  BrowserRouter as Routers,
  Route,
  Switch,
  Redirect,/**匹配第一个符合条件就跳出 */
} from 'react-router-dom'

import Login from '../blog/login/login'
import DashBoard from '../blog/dashBorad/DashBoard'
/**配置映射关系 */
const Router = () => {
  return <Routers>
           <Switch>
             <Route path='/login' component={Login}></Route>
             {/* render动态执行 */}
               <Route path='/' render={() => 
                   localStorage.getItem('isLogin')==='true'?
                   <DashBoard/>
                   :
                   <Redirect to='/login' />
               }/> 
            </Switch>
          </Routers>
} 
export default Router