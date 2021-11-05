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
  // {
  //   path: '/welcome',
  //   name: 'welcome',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  {
    path: '/admin',
    name: '后台管理',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/users-page',
        name: '管理用户',
        component: './AdminList/Users',
      },
      {
        path: '/admin/clients-page',
        name: '管理客户',
        component: './AdminList/Clients',
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
    path: '/',
    redirect: '/basic-list',
  },
  {
    component: './404',
  },
];
