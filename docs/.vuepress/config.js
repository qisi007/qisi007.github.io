
module.exports = {
    title: '凤凰城下的小码农',
    description: 'TypeScript4 最新官方文档翻译',
    theme: 'reco',
    // base: './',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    head: [

        [
            'link',
            {
                rel: 'shortcut icon',
                type: 'image/x-icon',
                href: `/logo.png`,
            },
        ],
    ],
    themeConfig: {
        subSidebar: 'auto',
        nav: [
            { text: '首页', link: '/' },
            { text: '前端', 
                items: [
                    {
                        text: 'vue',
                        link: '/js/js1' 
                    },
                    // {
                    //     text: 'uni-app',
                    //     items: [
                    //         {
                    //             title: 'uni-app—从安装到卸载',
                    //             path: 'https://www.cnblogs.com/qisi007/p/10489176.html'
                    //         },
                    //         {
                    //             title: 'uni-app实现顶部导航栏显示按钮+搜索框',
                    //             path: 'https://www.cnblogs.com/qisi007/p/10636164.html'
                    //         },
                    //         {
                    //             title: 'uni-app——想说爱你不容易之踩坑系列',
                    //             path: 'https://www.cnblogs.com/qisi007/p/10701510.html'
                    //         }
                    //     ]
                    // }
                ]},
            {
                text: '后端',
                items: [
                    { text: 'SpringBoot', link: '/SpringBoot/s1' },
                ]
            },
            {
                text: '年终总结',
                link: '/heart/h1'
            },
            {
                text: '开源项目',
                items: [
                    { text: 'react-admin-plus', link: 'https://github.com/qisi007/react-admin-plus' },
                    { text: 'h5-api', link: 'https://github.com/qisi007/h5-api' },
                    { text: 'better-sidebar', link: 'https://github.com/qisi007/better-sidebar' },
                    { text: 'multi-select', link: 'https://github.com/qisi007/multi-select' }
                ]
            },
            {
                text: '我的博客',
                items: [
                    { text: '微信公众号', link: 'https://camo.githubusercontent.com/e622e5f1976aa9eaf9c545342f66202be2cb649937de1e054accb75a8e426b08/68747470733a2f2f766b6365797567752e63646e2e6273706170702e636f6d2f564b4345595547552d66323035313565312d333765352d346234322d386637642d3435346563326139386364642f35333563363835382d383537372d346163612d383862642d3839623561376163666165662e6a7067' },
                    { text: 'Github', link: 'https://github.com/qisi007' },
                    { text: '掘金', link: 'https://juejin.cn/user/712139234359182/posts' }
                ]
            }
        ],
        sidebar: {
            '/SpringBoot/': [
                {
                    title: 'Spring Boot是什么？',
                    path: '/SpringBoot/s1'
                },
                {
                    title: 'springBoot 整合其他框架',
                    path: '/SpringBoot/s2'
                }
            ],
            '/heart/': [
                {
                    title: '2019年，敬自己是条汉子',
                    path: '/heart/h1'
                },
                {
                    title: '2020年年终总结',
                    path: '/heart/h2'
                },
                {
                    title: '回首2021年，我活的像个递归',
                    path: '/heart/h3'
                }
            ],
            '/js/': [
                {
                    title: 'vue的seo问题[上]',
                    path: '/js/js1'
                },
                {
                    title: 'vue的seo问题[下]',
                    path: '/js/js2'
                }
            ],
            '/uni/': [
                {
                    title: 'uni-app—从安装到卸载',
                    path: 'https://www.cnblogs.com/qisi007/p/10489176.html'
                },
                {
                    title: 'uni-app实现顶部导航栏显示按钮+搜索框',
                    path: 'https://www.cnblogs.com/qisi007/p/10636164.html'
                },
                {
                    title: 'uni-app——想说爱你不容易之踩坑系列',
                    path: 'https://www.cnblogs.com/qisi007/p/10701510.html'
                }
            ]
        }
    }
}