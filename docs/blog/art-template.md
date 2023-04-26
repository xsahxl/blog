---
group:
  title: article
toc: content
---

# Art-template

[Art-template](https://aui.github.io/art-template) 是一个轻量级、性能优异的 JavaScript 模板引擎，它可以用于前端和后端的模板渲染。本篇文档将为初学者介绍 Art-template 的基本使用方法。

## 安装

使用 npm 进行安装：

```bash
npm install art-template
```

## 引入

在需要使用模板引擎的文件中引入 art-template：

```js
const template = require('art-template');
```

## 渲染模板

使用 template 方法将模板渲染成 HTML 代码：

```js
const html = template('template string', data);
```

其中，第一个参数是模板字符串（可以从 HTML 文件中读取，也可以直接写在 JavaScript 代码中），第二个参数是传递给模板的数据。例如：

```js
const data = {
  name: 'Jack',
  age: 20,
};
const html = template('Hello {{name}}, your age is {{age}}.', data);
console.log(html); // Hello Jack, your age is 20.
```

## 基本语法

Art-template 支持以下基本语法：

{{value}}：输出变量的值
{{if condition}}...{{/if}}：条件判断
{{each list as item}}...{{/each}}：循环遍历数组或对象
例如：

```js
const data = {
  name: 'Tom',
  age: 18,
  friends: ['Jack', 'Rose', 'John'],
};
const html = template(
  `

  <p>Name: {{name}}</p>
  <p>Age: {{age}}</p>
  {{if age >= 18}}
    <p>You are an adult.</p>
  {{/if}}
  <ul>
    {{each friends as friend}}
      <li>{{friend}}</li>
    {{/each}}
  </ul>
`,
  data,
);
console.log(html);
```

输出结果为：

```html
<p>Name: Tom</p>
<p>Age: 18</p>
<p>You are an adult.</p>
<ul>
  <li>Jack</li>
  <li>Rose</li>
  <li>John</li>
</ul>
```

更多特性
Art-template 还支持许多高级特性，如布局继承、过滤器、自定义标签等。详细使用方法请参考官方文档。

## 总结：

Art-template 是一个功能强大、易于使用的模板引擎，可以用于前端和后端的模板渲染。初学者可以先掌握基本语法，再逐步学习高级特性。
