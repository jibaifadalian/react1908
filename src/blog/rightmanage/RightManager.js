import React, { Component } from 'react'

import { Tabs } from 'antd';

const { TabPane } = Tabs;
export default class RightManager extends Component {
    callback = (key)=> {
        console.log(key)
        this.props.history.push(key)
    }
    render() {
        return (
            <div>
                <Tabs activeKey={this.props.location.pathname} onChange={this.callback}>
                    <TabPane tab="角色列表" key='/right-manage/roles'>
                        
                    </TabPane>
                    <TabPane tab="权限列表" key='/right-manage/rights'>
                     </TabPane>
                
                </Tabs>
                { this.props.children }
            </div>
        )
    }
}
