import React,{useState,useEffect,useRef} from 'react'

import RichEditor from './RichEditor';

import axios from 'axios';
import { Steps, PageHeader, Button, message, Form, Input, Cascader } from 'antd';
const { Step } = Steps;

export default function Create_hooks(props) {
  const [current, setcurrent] = useState(0);
  const [dataList, setdataList] = useState([]);
  const [content, setcontent] = useState("");
  const [articalOption, setarticalOption] = useState(null);
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
  const form = useRef(null);
  const next = () => {
    /**第一步 进行表单校验 */
    if (current === 0) {
      form.current.validateFields().then(val => {
        /**校验成功更改状态 */
        setcurrent(current+1)
        setarticalOption(val)
      })
      return;
    }
    setcurrent(x => x + 1)
  }
  const prev = () => {
    const current = current - 1;
    setcurrent(x => x - 1)
  }

  const submit = () => {
    let { username, roleType } = JSON.parse(localStorage.getItem('user'));
    message.success('Processing complete!');
    /**将content   articalOption 存到数据库*/
    axios.post('/articles', {
      ...articalOption,
      content: content,
      author: username,
      roleType: roleType
    }).then(res => {
      /**跳转到list页面 */
      props.history.push('/article-manage/list')
    })
  }
  const getContent = (content) => {
    //同步子组件传来的内容
    setcontent(content)
  }
  
  useEffect(() => {
    axios.get('/categories').then(res => {
      setdataList(res.data)
    })
  }, [])

  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => props.history.goBack()}
        title="添加文章"
      />
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      {/* 步骤条 */}
      <div className="steps-content" style=
        {{ display: current === 0 ? 'block' : 'none', marginTop: 20 }}>
        <Form
          ref={form}
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
            <Cascader options={dataList}
              placeholder='请选择你文章类别'
              fieldNames={{ label: "title" }}
              // onChange={onChange}
            />
          </Form.Item>
        </Form>
      </div>
      <div className="steps-content" style=
        {{
          display: current === 1 ? 'block' : 'none', height: 500,
          overflow: 'hidden'
        }}>
        <RichEditor getContent={getContent} />
      </div>
      <div className="steps-content" style=
        {{ display:current === 2 ? 'block' : 'none' }}>
      </div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            下一步
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={submit}>
            提交
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: 8 }} onClick={() => prev()}>
            上一步
          </Button>
        )}
      </div>
    </div>
  )
}
