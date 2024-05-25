# 虚拟 dom

## 虚拟 dom 是什么

组件 render 返回的对象就是 vdom，一般包含标签名称，标签属性，事件监听和子元素等。

## 虚拟 dom 有什么优点

- 能减少不必要的 dom 操作

  - 减少 dom 更新的次数
    你用传统的原生 api 或 jQuery 去操作 DOM 时，浏览器会从构建 DOM 树开始从头到尾执行一遍流程
    当你在一次操作时，需要更新 10 个 DOM 节点，浏览器没这么智能，收到第一个更新 DOM 请求后，并不知道后续还有 9 次更新操作，因此会马上执行流程，最终执行 10 次流程
    而通过 VNode，同样更新 10 个 DOM 节点，虚拟 DOM 不会立即操作 DOM，而是将这 10 次更新的 diff 内容保存到本地的一个 js 对象中，最终将这个 js 对象一次性 attach 到 DOM 树上，避免大量的无谓计算

  - 减少 dom 更新的范围
    通过 diff 算法，能够只更新被修改的 DOM 节点，而非全部重绘

- 能跨平台渲染，比如 react native
  虚拟 DOM 最大的优势在于抽象了原本的渲染过程，实现了跨平台的能力，而不仅仅局限于浏览器的 DOM，可以是安卓和 IOS 的原生组件，可以是近期很火热的小程序，也可以是各种 GUI

## 虚拟 dom 怎么实现

- 虚拟 dom 一般用 js 对象来表示，比如

```js
{
  tag: 'div',
  attrs: {
    id: 'container',
    className: 'container'
  },
  children: [
    {
      tag: 'span',
      attrs: {
        className: 'red'
      },
      children: ['Hello, world!']
    }
  ]
}
```

## 虚拟 dom 有什么缺点

需要额外的创建函数，比如 CreateElement 或 h，但可以通过 jsx 来简化成 xml 写法
