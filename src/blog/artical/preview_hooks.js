import React,{useState,useEffect} from 'react'

import axios from 'axios';

import { PageHeader } from 'antd'

const usePreview = (props) => {
  const [title, settitle] = useState('');
  const [content, setcontent] = useState("")
  const [category, setcategory] = useState([])
  useEffect(
    () => {
      let id = props.match.params.id;
      axios.get(`/articles/${id}`).then(res => {
        let { title, category, content } = res.data
        settitle(title)
        setcontent(content)
        setcategory(category)
      })
    },[props])
  return {
    title,
    content,
    category
  }
}

export default function Preview_hook(props) {
  const {title,content,category} = usePreview(props)
  return <div>
    Preview_hook
          <PageHeader
            className="site-page-header"
            onBack={() => {
              props.history.goBack()
            }} //返回按钮
            title={title} //文章标题
            subTitle={category.join("/")} //分类
          />
          <div style={{ padding: "24px" }} dangerouslySetInnerHTML={{
            __html: content
          }} />
  </div>
}