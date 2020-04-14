import {
    OrderedListOutlined,
    FormOutlined,
    CopyOutlined
} from '@ant-design/icons';

 const  menus = [
    {
        title: '首页',
        path: '/home',
        icon: OrderedListOutlined
    },
    {
        title: '用户管理',
        path: '/user-manage',
        icon: OrderedListOutlined,
        children: [
            {
                title: '用户列表',
                path: '/user-manage/users',
                icon: FormOutlined
            },
        ]
    },
    {
        title: "权限管理",
        path: "/right-manage",
        icon: FormOutlined,
        children: [
            {
                title: "角色列表",
                path: "/right-manage/role",
                icon: CopyOutlined,
            },
            {
                title: "权限列表",
                path: "/right-manage/right",
                icon: CopyOutlined,
            }
        ]
    },

    {
        title: "文章管理",
        path: "/article-manage",
        icon: FormOutlined,
        children: [
            {
                title: "文章列表",
                path: "/article-manage/list",
                icon: CopyOutlined,
            },
            {
                title: "文章分类",
                path: "/article-manage/category",
                icon: CopyOutlined,
            }
        ]
    },
]
export default menus;
