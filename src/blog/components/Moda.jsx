import React, { Component } from 'react'
import { Modal, Form, Input, Select,} from 'antd';
const { Option } = Select;

export default class FormModa extends Component {
    state = {
        visible:false,
        formData:null,
        roleType:1
    }
    onChange = (value) => {
       /**调用父组件事件*/
        this.props.onUpdateChange(value)
    }
    handleOk = () => {
        this.props.handleUpdateOk()
    }
    handleCancel = () => {
        this.props.handleUpdateCancel()
    }
    render() {
        return (
            <Modal
                title="更新信息"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                forceRender={true}
            >
                <Form
                    ref='form'
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={this.state.formData}
                >
                    <Form.Item
                        name="username"
                        label="用户名"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input ref='usernameValue' />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[{ required: true, message: '请输入用户名!', pattern: /\w/ }]}
                    >
                        <Input ref='passwordValue' />
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
        )
    }
}
