---
group:
  title: QA
toc: content
---

# fc 控制台 stream 流存在问题

首先在控制天 我们创建一个 springboot 应用， 可以在根目录下新建一个 index.js

## A

```js
const { command } = require('execa');
const path = require('path');

command('mvn package -DskipTests', {
  cwd: path.resolve(__dirname, './code'),
  shell: true,
  stdio: 'inherit',
});
```

## B

```js
const { command } = require('execa');
const path = require('path');

function onFinish(cp) {
  return new Promise((resolve, reject) => {
    const stdout = [];
    const stderr = [];
    cp.stdout.on('data', (chunk) => {
      console.info(chunk.toString());
      stdout.push(chunk);
    });

    cp.stderr.on('data', (chunk) => {
      console.info(chunk.toString());
      stderr.push(chunk);
    });

    cp.on('exit', (code) => {
      code === 0
        ? resolve({})
        : reject(new Error(Buffer.concat(stderr).toString()));
    });
  });
}

(async () => {
  const cp = command('mvn package -DskipTests', {
    cwd: path.resolve(__dirname, './code'),
    shell: true,
  });
  await onFinish(cp);
})();
```

A 是符合预期的，但是 B 不符合预期，此问题已反馈，后续有结论会更新此文档。
