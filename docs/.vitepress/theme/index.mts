import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        // @ts-ignore
        const modules  = import.meta.glob('../../components/public/*.vue')
        for (const path in modules) {
            modules[path]().then((mod) => {
                const name = mod.default.__name
                const com =mod.default
                app.component(name,com)
            })
        }
        // 注册自定义全局组件
    },
} satisfies Theme