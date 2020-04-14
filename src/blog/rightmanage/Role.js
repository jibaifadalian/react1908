import React, { Component } from 'react'

import axios from 'axios';
import { Table, Tag, Button} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { connect } from "react-redux";
class Role extends Component {
    state = {
        dataList:[]
    }
    columns = [
        { title: '超级管理员', dataIndex: 'roleName', key: 'roleName' },
        {
            title: '操作',
            dataIndex: '',
            key: 'x',
            render: () => <Button type="primary" icon={<SearchOutlined />}/>
        },
    ];
 
    componentDidMount() {
        if (this.props.roleList.length===0){
            this.props.actionCreator()
        }
    }
    render() {
        return (
            <Table
                columns={this.columns}
                expandable={{
                    expandedRowRender: record => {
                        console.log(record)
                        return <div style={{ margin: 0 }}>
                            {
                                record.roleRight.map(item => {
                                    return <div key={item.category}>
                                        <h2>{item.category}:</h2>
                                        {
                                            item.list.map(data => {
                                                return <Tag color={'green'} key={data}>{data}&nbsp;</Tag>
                                            })
                                        }
                                    </div>
                                    
                                })
                            }
                        </div> 
                        
                    },
                    rowExpandable: record => record.name !== 'Not Expandable',
                }}
                dataSource={this.props.roleList}
                rowKey={item=>item.id}
            />
        )
    }
}

const mapStateToProps = function(state) {
    return {
        roleList:state.roleList
    }
}
const mapDispatchToProps = {
    actionCreator:() => {
        return (dispatch) => {
            axios.get('/roles').then(res => {
                dispatch({
                    type: 'roleAxios',
                    payload: res.data
                }) 
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Role)