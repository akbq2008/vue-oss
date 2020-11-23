<!--
 * @Author: wang_yechao
 * @Date: 2020-10-10 09:58:35
 * @LastEditors: wang_yechao
 * @LastEditTime: 2020-10-10 17:32:19
 * @Description: 
-->
# 安装
npm
```
npm install vue-oss --save-dev
```

yarn
```
yarn add vue-oss --dev
```

# package.json的scripts中加上如下
```
 "upload": "node ./node_modules/vue-oss/bin/index.js"
```
# 运行 
```
yarn run upload 或者npm run upload
```

# 参数
参数名 | 说明
---|---
targetDir | 指定上传的目录名称（默认为/）
region | oss的region
accessKeyId | oss的accessKeyId
accessKeySecret | oss的accessKeySecret
bucket | oss的bucket
isNuxt | 是否是nuxt编译后的包
isCustom | 是否是自定义路径
customPath | 自定义路径名称
cover | 是否已增量的形式（默认为增量形式：false,否则将会删除指定目录下的文件）

# 配置文件
```
vueOss.config.js
```