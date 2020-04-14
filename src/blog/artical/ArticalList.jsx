import React, { Component } from 'react'

import { Table,  Button } from 'antd';
import { EditOutlined, DeleteOutlined,SnippetsOutlined } from '@ant-design/icons';

import axios from 'axios';
export default class ArticalList extends Component {
    state = {
        columns: [
            {
                title: '文章标题',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: '文章作者',
                dataIndex: 'author',
                key: 'author',
            },
            {
                title: '文章分类',
                dataIndex: 'category',
                key: 'category',
            render: item => <div>{item.join('/')}</div>
            },
            {
                title: '操作',
                dataIndex: '',
                key: '',
                render: (item) => {
                    return <div>
                        <Button shape="circle" icon={<SnippetsOutlined />} 
                        onClick={() => this.preview(item.id)}/>
                        <Button type="primary" shape="circle" icon={<EditOutlined />}
                        onClick={() => this.editItem(item.id)}/>
                        <Button type="danger" shape="circle" icon={<DeleteOutlined />}
                            onClick={() => this.deleteItem(item.id)}/>
                    </div>
                }
            },
        ],
        dataList:[],
    }
  
    render() {
        return (
            <div>
                <Button type='primary' onClick={this.goCreate}>添加文章</Button>
                <Table columns={this.state.columns} dataSource={this.state.dataList}
                    rowKey={item => item.id}
                />
            </div>
        )
    }
    componentDidMount() {
        axios('/articles').then(res => {
            this.setState({
                dataList:res.data
            })
        })
    }

    preview = (id) => {
        this.props.history.push(`/article-manage/preview/${id}`)
    }
    goCreate = () => {
        this.props.history.push('/article-manage/create')
    }
    deleteItem = (id) => {
        console.log(id)
        axios.delete(`/articles/${id}`).then(res => {
            /**更新datalist */
            this.setState({
                dataList: this.state.dataList.filter(item => item.id !== id)
            })
        })
    }
    editItem = (id) => {
        this.props.history.push(`/artical-manage/update/${id}`)
    }
}
