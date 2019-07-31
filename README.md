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
