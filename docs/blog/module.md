---
group:
  title: article
toc: content
---

# 前端模块化

## AMD（Asynchromous Module Definition - 异步模块定义）

AMD 是**异步加载模块，推崇依赖前置**，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。这里介绍用 **RequireJS** 实现 AMD 规范的模块化：用`require.config()`指定引用路径等，用`define()`定义模块，用`require()`加载模块。

```javascript
// 定义math.js模块
define(function () {
  var basicNum = 0;
  var add = function (x, y) {
    return x + y;
  };
  return {
    add: add,
    basicNum: basicNum,
  };
});
// 定义一个依赖underscore.js的模块
define(['underscore'], function (_) {
  var classify = function (list) {
    _.countBy(list, function (num) {
      return num > 30 ? 'old' : 'young';
    });
  };
  return {
    classify: classify,
  };
});

// 引用模块，将模块放在[]内
require(['jquery', 'math'], function ($, math) {
  var sum = math.add(10, 20);
  $('#sum').html(sum);
});
```

## CMD（Common Module Definition - 公共模块定义）

CMD 是 SeaJS 在推广过程中对模块定义的规范化产出，对于模块的依赖，CMD 是**延迟执行，推崇依赖就近**。

```javascript
/** AMD写法 **/
define(['a', 'b', 'c', 'd', 'e', 'f'], function (a, b, c, d, e, f) {
  // 等于在最前面声明并初始化了要用到的所有模块
  a.doSomething();
  if (false) {
    // 即便没用到某个模块 b，但 b 还是提前执行了
    b.doSomething();
  }
});

/** CMD写法 **/
define(function (require, exports, module) {
  var a = require('./a'); //在需要时申明
  a.doSomething();
  if (false) {
    var b = require('./b');
    b.doSomething();
  }
});

/** sea.js **/
// 定义模块 math.js
define(function (require, exports, module) {
  var $ = require('jquery.js');
  var add = function (a, b) {
    return a + b;
  };
  exports.add = add;
});
// 加载模块
seajs.use(['math.js'], function (math) {
  var sum = math.add(1 + 2);
});
```

## CommonJS

CommonJS 是服务端模块的规范，由于 Node.js 被广泛认知。
根据 CommonJS 规范，一个单独的文件就是一个模块。加载模块使用 require 方法，该方法读取一个文件并执行，最后返回文件内部的 module.exports 对象。

```javascript
// 定义模块math.js
var basicNum = 0;
function add(a, b) {
  return a + b;
}
module.exports = { //在这里写上需要向外暴露的函数、变量
  add: add,
  basicNum: basicNum
}

// 引用自定义的模块时，参数包含路径，可省略.js
var math = require('./math');
math.add(2, 5);

// 引用核心模块时，不需要带路径
var http = require('http');
http.createService(...).listen(3000);
```

CommonJS 加载模块是同步的，所以只有加载完成才能执行后面的操作。像 Node.js 主要用于服务器的编程，加载的模块文件一般都已经存在本地硬盘，所以加载起来比较快，不用考虑异步加载的方式，所以 CommonJS 规范比较适用。但如果是浏览器环境，要从服务器加载模块，这是就必须采用异步模式。所以就有了 AMD CMD 解决方案。

## UMD（Universal Module Definition - 通用模块定义）

UMD 是 AMD 和 CommonJS 的一个糅合。AMD 是浏览器优先，异步加载；CommonJS 是服务器优先，同步加载。
既然要通用，怎么办呢？那就先判断是否支持 node.js 的模块，存在就使用 node.js；再判断是否支持 AMD（define 是否存在），存在则使用 AMD 的方式加载。这就是所谓的 UMD。

```javascript
((root, factory) => {
  if (typeof define === 'function' && define.amd) {
    //AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    //CommonJS
    var $ = requie('jquery');
    module.exports = factory($);
  } else {
    //都不是，浏览器全局定义
    root.testModule = factory(root.jQuery);
  }
})(this, $ => {
  //do something...  这里是真正的函数体
});
```

## ES6 Module

ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，旨在成为浏览器和服务器通用的模块解决方案。其模块功能主要由两个命令构成：`export`和`import`。`export`命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。

```javascript
/** 定义模块 math.js **/
var basicNum = 0;
var add = function (a, b) {
  return a + b;
};
export { basicNum, add };

/** 引用模块 **/
import { basicNum, add } from './math';
function test(ele) {
  ele.textContent = add(99 + basicNum);
}
```

## ES6 模块与 CommonJS 模块的差异

### 1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。

- CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
- ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令`import`，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的`import`有点像 Unix 系统的“符号连接”，原始值变了，`import`加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

### 2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

- 运行时加载: CommonJS 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。

- 编译时加载: ES6 模块不是对象，而是通过 `export` 命令显式指定输出的代码，`import`时采用静态命令的形式。即在`import`时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”。

CommonJS 加载的是一个对象（即`module.exports`属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。
