---
group:
  title: QA
toc: content
---

# Converting circular structure to JSON

### 问题描述

代码复现

```
var mycar ={}
mycar.a = mycar
JSON.stringify(mycar)
```

核心的报错内容如下

```log
- Converting circular structure to JSON
    --> starting at object with constructor 'DerivedLogger'
    |     property '_readableState' -> object with constructor 'ReadableState'
    |     property 'pipes' -> object with constructor 'Console'
    --- property 'parent' closes the circle
```

### 解决问题

1. 去除依赖，尝试删除在代码中创建的任何循环依赖项。
2. 使用扁平包，示例代码：

```ts
import { stringify } from 'flatted';

const mycar = {};
mycar.a = mycar;

stringify(mycar);
console.log(mycar);
```
