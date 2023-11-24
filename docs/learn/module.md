# 前端模块化

具体可查看 `js/module` 目录下的示例

## 进化史

- 全局函数
- 命名空间函数 
- IIFE（匿名闭包）
- IIFE 增强版, 传入依赖

## 模块化的好处

- 避免命名冲突
- 更好的分离，按需加载
- 更高复用性
- 高可维护性

## 页面引入加载 script 存在问题
- 请求过多
- 依赖模糊
- 难以维护

## 模块化

### CommonJS （服务端 同步加载）
CommonJS是服务端模块的规范，由于Nodejs被广泛认知，根据CommonJS规范，一个文件就是一个模块，通过 `require` 方法加载模块，最后返回 module.exports 对象

### AMD （浏览器端 异步加载模块 RequireJS）

Asynchromous Module Definition主要是通过 `RequireJS` 实现的模块化，采用 `define` 定义模块，对于被依赖的模块需要前置声明，`requirejs` 加载模块， `requirejs.config`指定模块的引用路径等

### CMD（异步加载模块 sea.js）

定义的时候使用 `AMD define` 的方式，暴漏的时候使用 `CommonJS` 的方法，function接收是三个固定的行参（require, exports, module）

### UMD （CommonJS + AMD）
UMD 是 CommonJS 和 AMD 的一个结合，AMD 是浏览器优先，异步加载；CommonJS 是服务端优先，同步加载；

### es6

es6 的设计思想是尽量的静态化，使得编译的时候就可以确定模块之间的依赖关系，以及输入和输出的变量，`CommonJS` 和 `AMD`模块，都只能在运行时才能确定这些东西。

## es6 vs CommonJS

- `CommonJS` 模块的输出是值的拷贝，`CommonJS` 模块的输出是值的引用
- `CommonJS` 模块是运行时加载，`CommonJS` 模块是编译时候输出接口