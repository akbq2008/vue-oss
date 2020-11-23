/*
 * @Author: wang_yechao
 * @Date: 2020-10-10 09:58:35
 * @LastEditors: wang_yechao
 * @LastEditTime: 2020-10-10 17:26:52
 * @Description: 
 */
const OSS = require("ali-oss");
const fs = require("fs");
const path = require("path")
const config = require(path.resolve(path.resolve(), './vueOss.config.js'))
const targetDir = config.targetDir; // 上传到oss的目录
const region = config.region;
const accessKeyId = config.accessKeyId;
const accessKeySecret = config.accessKeySecret;
const bucket = config.bucket;
const isNuxt = config.isNuxt; // 是否是nuxt打包文件
const isCustom = config.isCustom // 是否是自定义路径
const customPath = config.customPath // 自定义路径名称
const cover = config.cover || false // 是否删除远程oss上指定目录原有文件，否则已增量形式添加
let buildPath
if (isCustom) {
    buildPath = customPath
} else {
    buildPath = "/dist"
    isNuxt ? buildPath = '/.nuxt/dist/client' : buildPath = "/dist";
}
const PUBLIC_PATH = path.resolve();
const client = new OSS({
    region: region,
    accessKeyId: accessKeyId,
    accessKeySecret: accessKeySecret,
    bucket: bucket
})

/**
 *获取文件目录并删除
 * @param {*} dir //文件目录
 */
async function deleteDir(dir) {
    let result = await client.list({
        prefix: dir + "/",
        delimiter: "/"
    });
    if (result.objects) {
        let aa = [];
        result.objects.forEach(function (obj) {
            aa.push(obj.name);
        });
        try {
            await client.deleteMulti(aa, {
                quiet: true
            });
            console.log("删除成功");
        } catch (e) {
            console.log("文件删除失败", e);
        }
    }
}

/**
 * 遍历文件夹递归上传
 * @param {path} src 本地路径
 * @param {string} dist oos文件夹名
 */
function addFileToOSSSync(src, dist) {
    let docs = fs.readdirSync(src);
    docs.forEach(function (doc) {
        let _src = src + "/" + doc,
            _dist = dist + "/" + doc;
        let st = fs.statSync(_src);
        // 判断是否为文件
        if (st.isFile() && doc !== ".DS_Store") {
            putOSS(_src, _dist);
        }
        // 如果是目录则递归调用自身
        else if (st.isDirectory()) {
            addFileToOSSSync(_src, _dist);
        }
    });
}
/**
 *单个文件上传至oss
 */
async function putOSS(src, dist) {
    try {
        await client.put("/" + dist, src);
    } catch (e) {
        console.log("上传失败".e);
    }
}
/**
 *上传文件启动
 *@param {string} dirName 将要上传的文件名
 */
async function upFile(dirName) {
    try {
        if (cover) {
            await deleteDir(dirName);
        }
        await addFileToOSSSync(PUBLIC_PATH + buildPath, dirName);
        console.log(dirName + "上传oss成功");
    } catch (err) {
        console.log(dirName + "上传oss成功失败", err);
    }
}

module.exports = function () {
    upFile(targetDir)

}