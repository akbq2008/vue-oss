/*
 * @Author: wang_yechao
 * @Date: 2020-10-10 09:58:35
 * @LastEditors: wang_yechao
 * @LastEditTime: 2020-10-10 17:16:33
 * @Description: 
 */
require('shelljs/global');
const inquirer = require('inquirer'); //输出提示的
const fs = require("fs")
const path = require("path");
const {
    touch
} = require('shelljs');
const {
    exec
} = require('child_process');
const configObj = Object.create(null)
if (fs.existsSync(path.resolve(path.resolve(), './vueOss.config.js'))) {
    //已生成配置文件
    uploadCb()
} else {
    prompt()
}

function prompt() {
    inquirer.prompt([{
        name: 'message',
        type: 'input',
        message: `指定上传的OSS目录名字`,
        default: "/static"
    }]).then(answers => {
        configObj.targetDir = answers.message
    }).then(() => {
        // region
        inquirer.prompt([{
            name: 'message',
            type: 'list',
            message: `请输入OSS的region`,
            default: "oss-cn-hangzhou",
            choices: ["oss-cn-hangzhou", "oss-cn-shanghai", "oss-cn-qingdao", "oss-cn-beijing", "oss-cn-zhangjiakou", "oss-cn-huhehaote", "oss-cn-shenzhen", "oss-cn-chengdu"]
        }]).then(answers => {
            configObj.region = answers.message
        }).then(() => {
            // keyId
            inquirer.prompt([{
                name: 'message',
                type: 'input',
                message: `请输入OSS的accessKeyId`
            }]).then(answers => {
                configObj.accessKeyId = answers.message
            }).then(() => {
                // secreate
                inquirer.prompt([{
                    name: 'message',
                    type: 'input',
                    message: `请输入OSS的accessKeySecret`
                }]).then(answers => {
                    configObj.accessKeySecret = answers.message
                }).then(() => {
                    // bucketName
                    inquirer.prompt([{
                        name: 'message',
                        type: 'input',
                        message: `请输入OSS的bucket`
                    }]).then(answers => {
                        configObj.bucket = answers.message
                    }).then(() => {
                        // nuxt
                        inquirer.prompt([{
                            name: 'message',
                            type: 'confirm',
                            message: `是否自定义上传路径？`
                        }]).then(answers => {
                            if (answers.message) {
                                inquirer.prompt([{
                                    name: 'message',
                                    type: 'input',
                                    message: `请输入自定义路径名称`
                                }]).then(ans => {
                                    configObj.isCustom = true
                                    configObj.customPath = ans.message
                                    execFn()
                                })
                            } else {
                                configObj.isCustom = false
                                inquirer.prompt([{
                                    name: 'message',
                                    type: 'confirm',
                                    message: `是否是nuxt配置`
                                }]).then(ans => {
                                    configObj.isNuxt = ans.message
                                    execFn()
                                })
                            }
                        })
                    })
                })
            })
        })
    })
}

function uploadCb() {
    const upFile = require('../main.js')
    upFile();
}

function execFn() {
    touch('vueOss.config.js')
    exec(`echo  module.exports =${JSON.stringify(configObj)} >> vueOss.config.js`)
    uploadCb()
}