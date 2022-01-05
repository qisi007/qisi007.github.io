
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
            { text: 'java', link: '/java/java1'},
            { text: '前端', link: '/js/js1'},
            {
                text: '我的博客',
                items: [
                    { text: 'Github', link: 'https://github.com/mqyqingfeng' },
                    { text: '掘金', link: 'https://juejin.cn/user/712139234359182/posts' }
                ]
            }
        ],
        sidebar: {
            '/java/': [
                {
                    title: 'java1',
                    path: '/java/java1'
                },
                {
                    title: 'java2',
                    path: '/java/java2'
                }
            ],
            '/js/': [
                {
                    title: 'js1',
                    path: '/js/js1'
                },
                {
                    title: 'js2',
                    path: '/js/js2'
                }
            ]
        }
        
        
        // [
        //     {
        //         title: '欢迎学习',
        //         path: '/',
        //         collapsable: false
        //     },
        //     {
        //         title: "基础学习",
        //         path: '/handbook/ConditionalTypes',
        //         collapsable: false, // 不折叠
        //         children: [
        //             { title: "条件类型", path: "/handbook/ConditionalTypes" },
        //             { title: "泛型", path: "/handbook/Generics" }
        //         ],
        //     }
        // ]
    }
}