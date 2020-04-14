import React, { Component } from 'react'
import { withRouter } from "react-router";

import { Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import axios from 'axios';
import Particles from 'react-particles-js';

import './login.css'

class Login extends Component {
     /**登录成功 */
    onFinish = values => {
        console.log('Received values of form: ', values);
        
        axios(`/users?username=${values.username}&password=${values.password}&roleState=true`)
        .then(res => {
            if(res.data.length){
            /**登录成功 */
                localStorage.setItem('isLogin', true);
                localStorage.setItem('user',JSON.stringify(res.data[0]));
                this.props.history.push('/home');
            }else{
                message.error('用户名密码不匹配');
            }
        })
       
    };
    render() {
        return (
            <div style={{ height: '100%', background: "rgb(35,39,65)" }}>
                <Particles height={window.innerHeight -5 + 'px'} />
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
export default withRouter(Login);