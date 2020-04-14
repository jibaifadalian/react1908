import React, { Component } from 'react'
import { Cascader, Table  } from 'antd';
import axios from 'axios'
export default class ArticalCategory extends Component {
  state = {
    option:[]
  }
  render() {
    const columns = [
      {
        title: 'title',
        dataIndex: 'title',
        key: 'title',
      },
     
    ];

  
    return (
      <div>
        <Cascader options={this.state.options} onChange={this.onChange} 
          placeholder="Please select" fieldNames={{ label: 'title', value: 'title',}}/>
        <Table columns={columns} dataSource={this.state.options} rowKey={item => item.id}/>
      </div>
    )
  }
  componentDidMount() {
    axios.get("/categories").then(res => {
      this.setState({
        options:res.data
      })
    })
  }
  onChange = () => {

  }
}
