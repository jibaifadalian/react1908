import React, { Component } from 'react'
import { withRouter } from 'react-router'
/*导入渲染数据*/
import menus from '../network/menu';
// import store from '../store/store';
import {connect} from 'react-redux';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;
const { SubMenu } = Menu;

class SideMenu extends Component {
    // state = {
    //     collapsed: false,
    // };
   // redux版本   react-redux 无需自己监听
    // componentDidMount() { 
    //  /**订阅的返回函数就是取消订阅 */   
    // this.unSub = store.subscribe(() => {
    //         this.setState({
    //             collapsed:store.getState().isShow
    //         })
    //     })
    // }
   
    render() {
        let location = this.props.location.pathname;
        let defaultOpenKeys = ['/' + location.split('/')[1]];
        return (
            /**通过属性获取react-redux中  状态 */
            <Sider trigger={null} collapsible collapsed={this.props.isShow}>
                <Menu theme="dark" mode="inline" 
                    onClick={this.handleClick} defaultOpenKeys={defaultOpenKeys}
                    selectedKeys={[location]}
                    >
                    {this.renderItem(menus)}
                </Menu>
            </Sider>
        )
    }
    /**跳转路由 */
    handleClick = (param) => {
  
        this.props.history.push(param.key)
    }
    /**渲染 */
    renderItem = (menus) => {
        let roleType = JSON.parse(localStorage.getItem('user')).roleType;
        return menus.map(item => {
            if (item.children) {
                // 用户权限低于item权限时，不进行创建元素
                if(item.permission > roleType) {
                    return null;
                }
                return (
                    <SubMenu
                        key={item.path}
                        title={
                            <span>
                                <item.icon />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.renderItem(item.children)}   
                    </SubMenu>
                )
            } else {
                if (item.permission > roleType) {
                    return null;
                }
                return (
                    <Menu.Item key={item.path}>
                        <item.icon />
                        <span>{item.title}</span>
                    </Menu.Item>
                )
            }
        })
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    /**state为包含所有初始状态对象 */
    return {
        isShow:state.isShow
    }
}

export default withRouter(connect(mapStateToProps)(SideMenu))
// export default withRouter(SideMenu)