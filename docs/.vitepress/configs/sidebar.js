export default {
  '/entry/front/': getFrontSidebar(),
  '/entry/server/': getServerSidebar(),
  '/entry/article/': getArticleSidebar(),
  '/entry/problem/': getProblemSidebar()
}

function getFrontSidebar() {
  return [
    {
      text: 'vue',
      collapsible: true,
      items: [
        {
          text: 'vue的seo问题【上】',
          link: '/entry/front/001vue的seo问题【上】'
        },
        {
          text: 'vue的seo问题【下】',
          link: '/entry/front/002vue的seo问题【下】'
        }
      ]
    },
    {
      text: '黑科技',
      collapsible: true,
      items: [
        {
          text: 'gitee推送代码自动部署到静态资源服务器',
          link: '/entry/front/gitee推送代码自动部署到静态资源服务器'
        }
      ]
    }
  ]
}

function getServerSidebar() {
  return [
    {
      text: 'springBoot',
      items: [
        {
          text: 'springBoot简介',
          link: '/entry/server/s1'
        },
        {
          text: 'springBoot整合其他框架',
          link: '/entry/server/s2'
        },
        {
          text: 'yaml语法',
          link: '/entry/server/s3'
        },
        {
          text: 'springBoot自动配置-Condition',
          link: '/entry/server/s4'
        },
        {
          text: 'springBoot切换web服务器',
          link: '/entry/server/s5'
        },
        {
          text: 'Enable注解原理',
          link: '/entry/server/s6'
        }
      ]
    }
  ]
}

function getArticleSidebar() {
  return [
    {
      text: '年终总结',
      items: [
        {
          text: '2019年',
          link: '/entry/article/h1'
        },
        {
          text: '2020年',
          link: '/entry/article/h2'
        },
        {
          text: '2021年',
          link: '/entry/article/h3'
        },
        {
          text: '2022年',
          link: '/entry/article/h4'
        }
      ]
    }
  ]
}

function getProblemSidebar() {
  return [
    {
      text: '问题记录',
      items: [
        {
          text: '为什么git bash能运行shell脚本？',
          link: '/entry/problem/为什么gitbash能运行shell脚本'
        }
      ]
    }
  ]
}

