#!/usr/bin/env node
require('shelljs/global');
const inquirer = require('inquirer');//输出提示的
const fs = require("fs")
const path = require("path")
const lines = fs.readFileSync(path.resolve(__dirname, "../main.js")).toString()//
if (lines.indexOf("hasConfiguredContent") > -1) {
    //第一次写
    prompt();
} else {
    // 是否要覆盖？
    inquirer.prompt([
        {
            name: 'message',
            type: 'confirm',
            message: '是否要覆盖默认设置'
        }
    ]).then(answers => {
        // console.log(answers);
        let result = answers.message;
        if (result) {
            // 覆盖默认的
            sed('-i', 'hasConfiguredContent', 'false', path.resolve(__dirname, "../main.js"));
            prompt();
        } else {
            const upFile = require('../main.js')
            upFile();
        }
    })

}


function prompt() {
    inquirer.prompt([
        {
            name: 'message',
            type: 'input',
            message: `指定上传的OSS目录名字(不指定默认为static)`,
            default: "/"
        }
    ]).then(answers => {
        let targetDirContent = JSON.stringify(answers.message.toString());
        sed('-i', 'targetDirContent', targetDirContent, path.resolve(__dirname, "../main.js"));
    }).then(() => {
        // region
        inquirer.prompt([
            {
                name: 'message',
                type: 'list',
                message: `请输入OSS的region`,
                default: "oss-cn-hangzhou",
                choices: ["oss-cn-hangzhou", "oss-cn-shanghai", "oss-cn-qingdao", "oss-cn-beijing", "oss-cn-zhangjiakou", "oss-cn-huhehaote", "oss-cn-shenzhen", "oss-cn-chengdu"]
            }
        ]).then(answers => {
            let regionContent = JSON.stringify(answers.message.toString());
            sed('-i', 'regionContent', regionContent, path.resolve(__dirname, "../main.js"));
        }).then(() => {
            // keyId
            inquirer.prompt([
                {
                    name: 'message',
                    type: 'input',
                    message: `请输入OSS的accessKeyId`
                }
            ]).then(answers => {
                let accessKeyIdContent = JSON.stringify(answers.message.toString());
                sed('-i', 'accessKeyIdContent', accessKeyIdContent, path.resolve(__dirname, "../main.js"));
            }).then(() => {
                // secreate
                inquirer.prompt([
                    {
                        name: 'message',
                        type: 'input',
                        message: `请输入OSS的accessKeySecret`
                    }
                ]).then(answers => {
                    let accessKeySecretContent = JSON.stringify(answers.message.toString());
                    sed('-i', 'accessKeySecretContent', accessKeySecretContent, path.resolve(__dirname, "../main.js"));
                }).then(() => {
                    // bucketName
                    inquirer.prompt([
                        {
                            name: 'message',
                            type: 'input',
                            message: `请输入OSS的bucket`
                        }
                    ]).then(answers => {
                        let bucketContent = JSON.stringify(answers.message.toString())
                        sed('-i', 'bucketContent', bucketContent, path.resolve(__dirname, "../main.js"));
                    }).then(() => {
                        // nuxt
                        inquirer.prompt([
                            {
                                name: 'message',
                                type: 'confirm',
                                message: `是否是nuxt配置`
                            }
                        ]).then(answers => {
                            let isNuxtContent = answers.message.toString();
                            sed('-i', 'isNuxtContent', isNuxtContent, path.resolve(__dirname, "../main.js"));
                            let hasConfiguredContent = 'true';
                            sed('-i', 'hasConfiguredContent', hasConfiguredContent, path.resolve(__dirname, "../main.js"));
                            const upFile = require('../main.js')
                            upFile();
                        });
                    });;
                });
            })
        })
    })

}
