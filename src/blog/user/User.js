import React, { Component } from 'react'

import FormModa from '../components/Moda';

import axios from 'axios';
import { Table, Switch, Button, Modal, Form, Input, Select, message} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Option } = Select;


export default class User extends Component {
    state = {
        roleType:1,
        visible: false,
        columns: [
            {
                title: '角色名称',
                dataIndex: 'roleName',
                key: 'roleName'
            },
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'usename',
            },
            {
                title: '用户状态',
                dataIndex: 'roleState',
                key: 'roleState',
                render: (state, data) => {
                    return <Switch defaultChecked={state} disabled={data.default} 
                        onChange={checked => {
                            /**更改对应开关状态 */
                            axios.put(`/users/${data.id}`,{
                                ...data,
                                roleState:checked     //会覆盖原有的rolestate
                            })
                        }}
                    />
                }
            },
            {
                title: '操作',
                dataIndex: '',
                key: '',
                render: (item) => {
                    return <div>
                        <Button type="primary" shape="circle" icon={<EditOutlined />}
                            disabled={item.default} onClick={() => this.editItem(item.id)}/>
                        &nbsp;
                        <Button type="danger" shape="circle" icon={<DeleteOutlined />}
                            disabled={item.default} onClick={() => this.deleteItem(item.id)}/>
                    </div>
                }
            },
        ],
        dataList: []
    }
    componentDidMount() {
        axios.get('/users').then(res => {
            this.setState({ dataList: res.data })
        })
    }
  
   // 删除
    deleteItem = (id) => {
        axios.delete(`/users/${id}`).then(res => {
            this.setState({
                dataList: this.state.dataList.filter(item => item.id !== id)
            })
            message.success("删除成功")
        })
    }
    handleAdd = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = e => {
        this.setState({
            visible: false,
        });
        this.refs.form.validateFields()
            .then(values => {
                this.refs.form.resetFields()///重置初始值
                /**put请求 添加用户 */
                axios.post('/users',
                    { ...values, 
                    roleType: this.state.roleType, 
                    roleState: false })
                    .then(res => {
                        /**设置datalist 更改状态重新渲染 res.data为添加的数据*/
                        this.setState({
                            dataList: [...this.state.dataList, res.data]
                        })
                    })
            })
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    onChange = (value) => {
        let arr = ['小编', '管理员', '超级管理员']
        let roleType = arr.indexOf(value) + 1;
        this.setState({ roleType })
    }
    render() {
        return (
            <div>
                <Button type="primary" onClick={this.handleAdd}>添加用户</Button>
                <Table columns={this.state.columns} dataSource={this.state.dataList}
                    rowKey={item => item.id}
                />
                <Modal
                    title="用户信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form
                        ref='form'
                        layout="vertical"
                        name="form_in_modal"
                    >
                        <Form.Item
                            name="username"
                            label="用户名"
                            rules={[{ required: true, message: '请输入用户名!' }]}
                        >
                            <Input ref='usernameValue'/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[{ required: true, message: '请输入用户名!', pattern:/\w/ }]}
                        >
                            <Input ref='passwordValue'/>
                        </Form.Item>
                        <Form.Item
                            name="roleName"
                            label="角色"
                            rules={[{ required: true, message: '请输入角色!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="请选择角色"
                                optionFilterProp="children"
                                onChange={this.onChange}
                                // onFocus={onFocus}
                                // onBlur={onBlur}
                                // onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="超级管理员">超级管理员</Option>
                                <Option value="管理员">管理员</Option>
                                <Option value="小编">小编</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>

                {/* 编辑模块  */}
                <FormModa onUpdateChange={this.onUpdateChange} ref='FormModa'
                    handleUpdateOk={this.handleUpdateOk}
                    handleUpdateCancel={this.handleUpdateCancel}
                />               
            </div>
        )
    }

    handleUpdateCancel = () => {
        this.refs.FormModa.setState({
            visible: false
        })
    }
    handleUpdateOk = () => {
        this.refs.FormModa.setState({
            visible: false
        })
        this.refs.FormModa.refs.form.validateFields().then(values => {
            let id = this.refs.FormModa.state.formData.id;
            //数据库更新
            axios.put(`/users/${id}`,{
                ...this.refs.FormModa.state.formData,
                ...values,
                roleType: this.refs.FormModa.state.roleType
            }).then(res => {
                /**视图更新 */
            let arr = this.state.dataList.map(item => {
                    if(item.id===id){
                        return res.data;   //将修改过的数据替换
                    }else{
                        return item;
                    }
                })
                /**更新状态 */
                this.setState({
                    dataList:arr
                })
            })
        })
    }
    /**更改信息时  需对应更改state中roleType */
    onUpdateChange = (value) => {
       /***value为选择的下拉列表键值 */
        let arr = ['小编','管理员','超级管理员']
        let roleType = arr.indexOf(value) + 1;
        this.refs.FormModa.setState({
            roleType 
        })
    }
    //编辑
    editItem = (id) => {
        /**Moda框初次未创建  refs拿不到 解决方案：设置第一次就创建form   更改状态重新渲染form */
        let formList = this.state.dataList.filter(item => item.id === id);
        this.refs.FormModa.setState({
            visible:true,
            formData: formList[0],
            roleType: formList[0].roleType
        })
        let {username,password,roleName} = formList[0]
        this.refs.FormModa.refs.form && this.refs.FormModa.refs.form.setFieldsValue({
            username,
            password,
            roleName
        })
        
    }
}
