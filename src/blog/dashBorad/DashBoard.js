/**导入路由模块 */
import React, { Component } from 'react'
import {
    Redirect,
    Switch,/**匹配第一个符合条件就跳出 */
    Route,
} from 'react-router-dom'

import SideMenu from "./SideMenu";
import TopHeader from "./TopHeader";
import Home from '../home/home'
import User from '../user/User'
import RightManager from '../rightmanage/RightManager'
import Right from '../rightmanage/Right'
import Role from '../rightmanage/Role'
import NotFound from '../error/NotFound'
import ArtiaclList from "../artical/Article_hooks";
import ArticalCategory from "../artical/ArticalCategory";
import Create from '../artical/Create';
import Update from '../artical/Update';
import Preview from '../artical/preview_hooks';
import './DashBoard.css'

import { Layout } from 'antd';
const {  Content } = Layout;

export default class DashBoard extends Component {
   
    render() {
        let roleType = JSON.parse(localStorage.getItem('user')).roleType;
        return (
            <Layout style={{ height: '100%' }}>
                {/* <SideMenu history={this.props.history}/> */}
                <SideMenu />
                <Layout className="site-layout">
                    <TopHeader/>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 'auto',
                        }}
                    >
                        <Switch>

                            <Route path='/home' component={Home}/>
                            {/* 路由权限判断 */}
                            {
                                roleType === 3 ?
                                <Route path='/user-manage/users' component={User}></Route>
                                : null
                            }
                            
                           {
                               roleType===3?
                                    <Route path='/right-manage' render={(props) =>
                                        <RightManager {...props}>
                                            <Switch>
                                                <Route path='/right-manage/rights' component={Right}></Route>
                                                <Route path='/right-manage/roles' component={Role}></Route>
                                                <Redirect from='/right-manage' to='/right-manage/role' />
                                            </Switch>
                                        </RightManager>
                                    }></Route>
                                    : null         
                           }
                            {/* 文章管理 */}
                            <Route path='/article-manage/create' component={Create}></Route>
                            <Route path='/artical-manage/update/:id' component={Update}></Route>
                            <Route path='/article-manage/preview/:id' component={Preview}></Route>
                            <Route path='/article-manage/list' component={ArtiaclList}></Route>
                            <Route path='/article-manage/category' component={ArticalCategory}></Route>
                            {/* 重定向 */}
                            <Redirect from='/' to='/home' exact></Redirect>
                            <Route path='*' component={NotFound}></Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>)
    }
}
