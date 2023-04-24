---
group:
  title: note
toc: content
---

# react vs vue

watch (computed) => componentWillReceiveProps

Vue 组件分为全局注册和局部注册, 在 react 中都是通过 import 相应组件，然后模版中引用

vue 子组件一般要显示地调用 props 选项来声明它期待获得的数据。而在 react 中不必需， 也意味着 vue 中组件传值属性不能透传, 而 react 可以, 两者都有 props 校验机制

每个 Vue 实例都实现了事件接口，方便父子组件通信(bus, emit)，而 react 必需自己实现；

class/style 样式是叠加的 => className/style 是唯一的 (对于多个 class 建议使用 classnames 依赖)

slot => children, 比如 我有一个弹窗, 对于里面的内容并不确定, 可能会填充不同的东西, vue 通过 slot 来预留槽进行分发, react 对于纯函数来说是 props.children 来写, 对于 es 的类 class 来说是 this.props.children 来写, 一般通过解构进行赋值.

> tips:
> 1.Stateless Functional Component: 对于不需要内部状态，且用不到生命周期函数的组件，我们可以使用这种方式定义组件，比如展示性的列表组件，可以将列表项定义为 Stateless Functional Component。
> 2.PureComponent/Component: 大多数情况下， 我们使用 PureComponent 能够简化我们的代码，并且提高性能，但是 PureComponent 的自动为我们添加的 shouldComponentUpate 函数，只是对 props 和 state 进行浅比较(shadow comparison)，当 props 或者 state 本身是嵌套对象或数组等时，浅比较并不能得到预期的结果，这会导致实际的 props 和 state 发生了变化，但组件却没有更新
> vue 多了指令系统，让模版可以实现更丰富的功能，而 React 只能使用 JSX 语法
> tips:
> 1.vue 指令有 v-text, v-html, v-show, v-if, v-else, v-else-if, v-for, v-on, v-bind, v-model, v-pre, v-clock, v-once
> 2.v-pre:跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
> 3.v-clock: 这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签
> vue 下 v-model 语法糖可以数据双向绑定 => react 数据是单向的, 需要通过 setState 来更新视图
> 对于组件传值, vue 通过 props 从父组件向子组件传值, 如果在子组件需要更新该字段, 一般在 data 里重新定义该字段且初始值从 props 获取 => react 对于上述情况, 则是在 state 操作, 对于两者,都遵循 props down, event up
> Vue 中我们组合不同功能的方式是通过 mixin, 而在 React 中我们通过 HOC (高阶组件）
> 在 React 应用中，当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树。

如要避免不必要的子组件的重渲染，你需要在所有可能的地方使用 PureComponent，或是手动实现 shouldComponentUpdate 方法。同时你可能会需要使用不可变的数据结构来使得你的组件更容易被优化。

然而，使用 PureComponent 和 shouldComponentUpdate 时，需要保证该组件的整个子树的渲染输出都是由该组件的 props 所决定的。如果不符合这个情况，那么此类优化就会导致难以察觉的渲染结果不一致。这使得 React 中的组件优化伴随着相当的心智负担。

在 Vue 应用中，组件的依赖是在渲染过程中自动追踪的，所以系统能精确知晓哪个组件确实需要被重渲染。你可以理解为每一个组件都已经自动获得了 shouldComponentUpdate，并且没有上述的子树问题限制。
