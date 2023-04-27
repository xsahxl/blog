---
group:
  title: QA
  order: 1
toc: content
---

# 函数计算事件函数 debug 不生效

## 新建函数时可添加环境变量：

```bash
DEBUG=serverless-cd:*
```

## code

```js
'use strict';
/*
To enable the initializer feature (https://help.aliyun.com/document_detail/156876.html)
please implement the initializer function as below：
exports.initializer = (context, callback) => {
  console.log('initializing');
  callback(null, '');
};
*/
const debug = require('debug')('serverless-cd:engine');
exports.handler = (event, context, callback) => {
  // const eventObj = JSON.parse(event.toString());
  debug('debug engine test');
  callback(null, 'hello world');
};
```

点击 测试函数 发现 debug 未生效

## 排查记录

查看 debug 的代码定位到 最后的输出 是在 `node_modules/debug/src/node.js`文件

```js
function log(...args) {
  return process.stderr.write(util.format(...args) + '\n');
}
```

## 结论

显然我们并不需要错误的流进行输出，针对 serverless-cd，直接 console.log 进行输出。
