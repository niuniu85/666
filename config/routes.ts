export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '样品',
    icon: 'table',
    path: '/demo',
    component: './Demo/BasicList',
  },
  {
    path: '/admin',
    name: '后台管理',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/users',
        name: '管理用户',
        component: './AdminList/Users',
      },
      {
        name: '管理客户',
        routes: [
          {
            path: '/admin/client',
            name: '导入',
            component: './AdminList/Clients',
          },
          {
            path: '/admin/basic',
            name: '公海',
            component: './AdminList/BasicList',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '个人记录',
    icon: 'user',
    path: '/record-list',
    component: './recordList',
  },
  {
    name: '客户列表',
    icon: 'table',
    path: '/basic-list',
    component: './BasicList',
  },
  {
    name: '工具',
    icon: 'user',
    routes: [
      {
        path: '/chrome',
        name: '网站',
        component: './Chrome',
      },
      {
        path: '/mobilephone',
        name: '手机',
        component: './MobilePhone',
      },
    ],
  },
  {
    path: '/',
    redirect: '/basic-list',
  },
  {
    component: './404',
  },
];
