import React, { Component } from 'react'
import axios from 'axios';

import { PageHeader } from 'antd'
export default class Preview extends Component {
    state = {
        title: "",
        category: [],
        content: ""
    }
    render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => {
                        // console.log("back",this.props.history)
                        this.props.history.goBack()//返回上一个页面
                    }} //返回按钮
                    title={this.state.title} //文章标题
                    subTitle={this.state.category.join("/")} //分类
                />
                <div style={{ padding: "24px" }} dangerouslySetInnerHTML={{
                    __html: this.state.content
                }}/>
            </div>
        )
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        axios.get(`/articles/${id}`).then(res => {
            console.log(res.data)
            let { title, category, content } = res.data
            this.setState({
                title,
                category,
                content
            })
        })
    }
}
