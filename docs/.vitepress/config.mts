import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "HuBlog",
  description: "胡的个人博客",
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/head.jpg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '关于博客',
        items: [
          { text: '简单介绍', link: '/about/personal-introduction' }
        ]
      },
      {
        text: '夜深人静',
        items: [
          { text: '每日阅读', link: '/life/day-read' },
          { text: '诗词魅力', link: '/life/poetry-charm' }
        ]
      },
      {
        text: '内容管理',
        items: [
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
