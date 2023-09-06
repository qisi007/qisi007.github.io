export default {
  '/entry/front/': getFrontSidebar(),
  '/entry/server/': getServerSidebar(),
  '/entry/article/': getArticleSidebar()
}

function getFrontSidebar() {
  return [
    {
      text: 'vue',
      collapsible: true,
      items: [
        {
          text: '001vue的seo问题【上】',
          link: '/entry/front/001vue的seo问题【上】'
        },
        {
          text: '002vue的seo问题【下】',
          link: '/entry/front/002vue的seo问题【下】'
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

