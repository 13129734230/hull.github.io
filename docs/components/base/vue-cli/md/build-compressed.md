## 打包成压缩包

### 步骤一：
安装 filemanager-webpack-plugin 插件：
```js
npm install filemanager-webpack-plugin -D
```

### 步骤二
在vue.config.js中引入插件，并在configureWebpack中进行配置：（如项目中没有vue.config.js文件，则在根目录处手动创建一个，与src同一级。）
::: code-group
```js [vue.config.js]
const {defineConfig} = require('@vue/cli-service')
const FileManagerPlugin = require('filemanager-webpack-plugin')
 
//区分生产环境和开发测试环境
const isProd = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'development'
const buildFileName = isProd? 'proDist' : isTest? 'testDist' : 'dist'
const buildFileNameZip = isProd? 'admin正式版.zip' : isTest? 'admin测试版.zip' : 'dist.zip'
 
//获取打包时当前时间 做备份文件名前缀
const nowDate = new Date().toISOString().replaceAll(':','-').replaceAll('.','-');
 
module.exports = defineConfig({
    configureWebpack: {
        plugins: [
            new FileManagerPlugin({
                events:{
                    onEnd: {
                        delete: [ //首先需要删除项目根目录下的xx.zip
                            `./${buildFileNameZip}`,
                        ],
                        copy: [ //然后将dist文件夹下的所有文件复制到项目根目录
                            {source: `./${buildFileName}`, destination: `./backup/${nowDate+buildFileName}`},
                        ],
                        archive: [ //然后我们选择dist文件夹将之打包成xx.zip并放在根目录
                            {source: `./${buildFileName}`, destination: `./${buildFileNameZip}`},
                        ]
                    }
                },
            })
        ]
    },
})
    
```
:::

### 步骤三
运行打包脚本命令查看效果：
```js
npm run build
```