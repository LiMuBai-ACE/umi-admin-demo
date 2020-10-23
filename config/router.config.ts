module.exports = {
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: '登录中心',
            component: '@/pages/login',
            exact: true,
        },
        {
            path: '/admin',
            name: '后台管理系统',
            component: '@/layout/index',
            // exact: true,
            routes: [
                {
                    // exact: true,
                    path: '/admin',
                    name: '首页',
                    component: '@/pages/home',
                },
                {
                    // exact: true,
                    name: 'home',
                    routes: [
                        {
                            // exact: true,
                            path: '/admin/111111',
                            name: '111111',
                            component: '@/pages/home copy'
                        },
                        {
                            // exact: true,
                            path: '/admin/222222',
                            name: '222222',
                            component: '@/pages/home copy 2',
                        },
                    ],
                },
            ],
        },
    ],
};
