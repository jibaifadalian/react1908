import React, { Component } from 'react'
import {connect} from 'react-redux';

import { Table, Tag } from 'antd';

import { mapStateToProps, rightActionCreator } from "../store/actions";
class Right extends Component {
    static props = {
        rightList:[]
    }
   componentDidMount() {
       if (this.props.rightList.length===0){
        // dispatch
         this.props.rightActionCreator()
      } 
   }
    render() {
        const columns = [
            {
                title: '#',
                dataIndex: 'id',
                key: 'id',
                
            },
            {
                title: 'title',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'grade',
                dataIndex: 'grade',
                key: 'grade',
                render: (item) => {
                    let color = ['volcano', 'gold','red']
                    return <Tag color={color[item-1]}>{item}</Tag>
                }
            },
        ];

        return (
            <Table columns={columns} dataSource={this.props.rightList} 
            pagination={{pageSize:6}}
            />
        )
    }
}


export default connect(mapStateToProps, { rightActionCreator })(Right) 

