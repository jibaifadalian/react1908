import React, { useState, useEffect } from 'react'

import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined, SnippetsOutlined } from '@ant-design/icons';

import axios from 'axios';

const useArtical = (props) => {
  const columns = [
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
      render: item => <div>{item.join('/')}</div >
    },
    {
      title: '操作',
      dataIndex: '',
      key: '',
      render: (item) => {
        return <div>
          <Button shape="circle" icon={<SnippetsOutlined />}
            onClick={() => preview(item.id)} />
          <Button type="primary" shape="circle" icon={<EditOutlined />}
            onClick={() => editItem(item.id)} />
          <Button type="danger" shape="circle" icon={<DeleteOutlined />}
            onClick={() => deleteItem(item.id)} />
        </div>
      }
    },
  ]
  const [dataList, setdataList] = useState([]);//初始化dataList
  const preview = (id) => {
    props.history.push(`/article-manage/preview/${id}`)
  }
  const deleteItem = (id) => {
    axios.delete(`/articles/${id}`).then(res => {
      /**更新datalist */
      setdataList(dataList.filter(item => item.id !== id))
    })
  }
  const editItem = (id) => {
    props.history.push(`/artical-manage/update/${id}`)
  }
  const goCreate = () => {
    props.history.push('/article-manage/create')
  }
  useEffect(() => {
    axios('/articles').then(res => {
      setdataList(res.data)
    })
  }, [])
  return {
    dataList,
    columns,
    goCreate
  }
}

export default function Article_hooks(props) {
  const { dataList, columns, goCreate } = useArtical(props);
  return (
    <div>
      <Button type='primary' onClick={goCreate}>添加文章</Button>
      <Table columns={columns} dataSource={dataList}
        rowKey={item => item.id}
      />
    </div>
  )
}
