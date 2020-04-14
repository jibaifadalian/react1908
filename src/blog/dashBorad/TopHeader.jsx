import React, { Component } from 'react'
import { withRouter } from "react-router";

// import store from '../store/store';
import { connect } from "react-redux";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Layout, Dropdown, Menu, Avatar } from 'antd';
const { Header} = Layout;


class TopHeader extends Component {
    state = {
        collapsed: false,
    };
    toggle = (collapsed) => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
        /**fabu */
        // store.dispatch({
        //     type:'aaa',
        //     payload: collapsed
        // })
        /**通过属性调用 传递参数collapsed*/
        this.props.createActions(collapsed)
    };
    exit = () => {
        /**退出时，更改登录状态，清空user */
        localStorage.setItem('isLogin',false);
        localStorage.setItem('user',JSON.stringify({}));
        this.props.history.push('/login')
    }
    menu = (
        <Menu>
            <Menu.Item>
                <div>超级管理员</div>  
            </Menu.Item>
            <Menu.Item>
                <div onClick={this.exit}>退出</div>
            </Menu.Item>
        </Menu>
    );
    render() {
        return (
            <Header className="site-layout-background" style={{ padding: 0 }}>
                {
                    this.state.collapsed ?
                        <MenuUnfoldOutlined onClick={() => this.toggle(false)} className="trigger" />
                        :
                        <MenuFoldOutlined onClick={() => this.toggle(true)} className="trigger" />
                }
                <Dropdown overlay={this.menu} className='Dropdown'>
                      <div>
                         <Avatar size={"large"} icon={<UserOutlined />} />
                      </div>
                </Dropdown>
            </Header>
        )
    }
}

const mapStateToProps = function(params) {
    return {

    }
}
const mapDispatchToProps = {
    
        createActions: (collapsed) => {
            console.log(collapsed)
            return {
                type: 'aaa',
                payload: collapsed
            }
        }
   
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopHeader))