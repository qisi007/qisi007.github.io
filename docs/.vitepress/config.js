import { defineConfig } from 'vitepress'
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import nav from './configs/nav'
import sidebar from './configs/sidebar'

export default defineConfig({
  // lang: 'en-US',
  title: '凤凰城下的小码农',
  description: '一个被敲代码耽误的大艺术家',

  lastUpdated: true,
  cleanUrls: true,

  base: '/',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]
  ],

  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },

    config: (md) => {
      md.use(demoblockPlugin, {
        customClass: 'demoblock-custom'
      })
    }
  },

  vite: {
    plugins: [demoblockVitePlugin(), vueJsx()],
    resolve: {
      alias: {
        '@alias': path.resolve(__dirname, '../')
      }
    }
  },

  // vue: {},

  themeConfig: {
    outlineTitle: '本页目录',
    lastUpdatedText: '上次更新',
    logo: '/logo.svg',

    search: {
      provider: 'local',
      // provider: 'algolia',
      // options: {
      //   appId: 'X51HWTCQJJ',
      //   apiKey: 'ca20f15eb8a667898b65d13f4213ae3d',
      //   indexName: 'vitepress-demo'
      // }
    },

    // nav
    nav,

    // sidebar
    sidebar,

    editLink: {
      pattern: 'https://github.com/qisi007/qisi007.github.io/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/qisi007' }
      // { icon: 'github', link: 'https://juejin.cn/user/3931509311153469/posts' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present codeLiu'
    }
  }
})
