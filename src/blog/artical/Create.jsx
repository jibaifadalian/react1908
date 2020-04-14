import React, { Component } from 'react'
import axios from 'axios';

import { Steps, PageHeader, Button, message, Form, Input ,Cascader} from 'antd';
import RichEditor from './RichEditor';
const { Step } = Steps;


export default class Create extends Component {
    state = {
        current:0,
        dataList:[],
        articalOption:null,
        content:''
    }
    next() {
        /**第一步 进行表单校验 */
        console.log(this.state.current)
        if(this.state.current===0){
            this.refs.form.validateFields().then(val => {
                /**校验成功更改状态 */
                console.log(val)
                this.setState({
                    articalOption:val,//同步状态  保存val值
                    current:this.state.current + 1
                })
            })
            return;
        }
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    componentDidMount() {
        axios.get('/categories').then(res => {
            this.setState({
                dataList:res.data
            })
        })
    }
    render() {
        const steps = [
            {
                title: '基本信息',
                content: 'First-content',
            },
            {
                title: '文章内容',
                content: 'Second-content',
            },
            {
                title: '提交文章',
                content: 'Last-content',
            },
        ];
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };
       
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => this.props.history.goBack()}
                    title="添加文章"
                />
                <Steps current={this.state.current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                {/* 步骤条 */}
                <div className="steps-content" style=
                {{display:this.state.current===0?'block':'none',marginTop:20}}>
                    <Form
                        ref='form'
                        {...layout}
                        name="form_in_modal"
                    >
                        <Form.Item
                            name="title"
                            label="文章标题"
                            rules={[{ required: true, message: '请输入标题!' }]}
                        >
                            <Input ref='usernameValue' />
                        </Form.Item>
                        <Form.Item
                            name="category"
                            label="文章分类"
                            rules={[{ required: true }]}
                        >
                            <Cascader options={this.state.dataList} 
                            placeholder='请选择你文章类别' 
                            fieldNames={{label:"title"}} 
                            onChange={this.onChange}
                            />
                        </Form.Item>
                    </Form>
                </div>
                <div className="steps-content" style=
                {{ display: this.state.current === 1 ? 'block' : 'none',height:500,
                overflow:'hidden' }}>
                    <RichEditor getContent={this.getContent}/>
                </div>
                <div className="steps-content" style=
                {{ display: this.state.current === 2 ? 'block' : 'none' }}>
                </div>
                <div className="steps-action">
                    {this.state.current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            下一步
                        </Button>
                    )}
                    {this.state.current === steps.length - 1 && (
                        <Button type="primary" onClick={this.submit}>
                            提交
                        </Button>
                    )}
                    {this.state.current > 0 && (
                        <Button style={{ margin: 8 }} onClick={() => this.prev()}>
                            上一步
                        </Button>
                    )}
                </div>
            </div>
        )
    }
    getContent = (content) => {
        //同步子组件传来的内容
        this.setState({
            content
        })
    }
    submit = () => {
        let {username,roleType} = JSON.parse(localStorage.getItem('user'));
        message.success('Processing complete!');
        /**将content   articalOption 存到数据库*/
        axios.post('/articles',{
            ...this.state.articalOption,
            content:this.state.content,
            author:username,
            roleType:roleType
        }).then(res => {
            /**跳转到list页面 */
            this.props.history.push('/article-manage/list')
        })
    }
}
