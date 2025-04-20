import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "HxxBlog",
  head: [['link', { rel: 'icon', href: '/hublog/logo.ico' }]],
  base:'/hublog/',
  description: "胡xx的博客",
  markdown: {
    lineNumbers: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    }
  },
  themeConfig: {
    // https://vitepress.dev  /reference/default-theme-config
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '作者', link: '/about/personal-introduction' }
    ],

    sidebar: [
      {
        text: '关于',
        items: [
          { text: '每日充能', link: '/about/daily-charge' },
          // { text: '简单介绍', link: '/about/personal-introduction' }
        ]
      },
      // {
      //   text: '夜深人静',
      //   items: [
      //     { text: '每日阅读', link: '/life/day-read' },
      //     { text: '诗词魅力', link: '/life/poetry-charm' }
      //   ]
      // },
      {
        text: '内容管理',
        items: [
          { text: '概念篇', link: '/base/concept' },
          { text: 'css案例', link: '/base/css' },
          { text: 'ts笔记', link: '/base/ts' },
          { text: 'vue2笔记', link: '/base/vue2' },
          { text: 'vue-cli笔记', link: '/base/vue-cli' },
          { text: '运算符笔记', link: '/base/operators' },
          { text: '通用hooks', link: '/base/basis-hooks' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    outline:{
      label:'页面导航'
    }
  }
})
