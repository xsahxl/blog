# diff 和 fiber

## 是什么？

diff 算法是通过对比新旧虚拟 dom 精确的找出变化之处，然后同步到真实的 dom 上。

## 原理

react diff 算法 主要遵循三个层级的策略

- tree 层级
- component 层级
- element 层级

### tree 层级

DOM 节点跨层级的操作不做优化，只会对相同层级的节点进行比较
![](https://static.vue-js.com/ae71d1c0-ec91-11eb-85f6-6fac77c0c9b3.png)

只有删除、创建操作，没有移动操作，如下图：
![](https://static.vue-js.com/b85f2bb0-ec91-11eb-ab90-d9ae814b240d.png)

react 发现新树中，R 节点下没有了 A，那么直接删除 A，在 D 节点下创建 A 以及下属节点

上述操作中，只有删除和创建操作

### component 层级

如果是同一个类的组件，则会继续往下 diff 运算，如果不是一个类的组件，那么直接删除这个组件下的所有子节点，创建新的

![](https://static.vue-js.com/c1fcdf00-ec91-11eb-ab90-d9ae814b240d.png)

当 component D 换成了 component G 后，即使两者的结构非常类似，也会将 D 删除再重新创建 G

### element 层级

对于比较同一层级的节点们，每个节点在对应的层级用唯一的 key 作为标识

提供了 3 种节点操作，分别为 INSERT_MARKUP(插入)、MOVE_EXISTING (移动)和 REMOVE_NODE (删除)

## fiber

React 16 以前递归对比虚拟 DOM 树的方案有一个明显的问题：`阻塞主线程`。旧的 React 架构中，Diff 算法和组件更新都是同步执行的。这意味着一旦更新开始，React 会一直占用主线程直到整个更新过程完成，这就可能导致浏览器无法响应用户操作，界面卡顿等现象

React 16 为了优化性能，会先把虚拟 DOM 树转换成 Fiber，也就是从树转换成链表，再基于 Fiber 进行渲染。这个过程分成两个阶段：

- reconcile（可中断） ：从虚拟 DOM 转换成 Fiber，并给需要操作的节点打上标记。
- commit（不可中断） ：对有标记的 Fiber 节点进行操作。

### 建立 fiber

第一次渲染不需要 diff，直接讲虚拟 dom 转为 fiber

![](https://cdn.jsdelivr.net/gh/xsahxl/blog-images/create-fiber.drawio.png)

### 更新 fiber

尽可能复用旧的 fiber 来更新本次的 fiber

![](https://cdn.jsdelivr.net/gh/xsahxl/blog-images/update-fiber.drawio.png)

具体实现分为两次遍历

- 第一次遍历：`复用 位置和内容都相同的节点`。方式是对比虚拟 dom 和旧的 fiber，如果可以复用就继续处理下一个节点，否则就结束遍历。
  如上图，相比初始的 fiber，A，B，C 都是完全没变的，直接复用，在往下走原本是 E，但现在变成了 D，发现不能复用，直接返回

- 第二次遍历：`把剩下的内容填上`, 方法是把剩余的旧 fiber 节点做成一个 map，然后遍历新 dom 树，构建新 fiber 的时候查查 map，能复用的就复用，用不了就新建。如上图，构建 D、F、H 的时候发现旧 Fiber 里有，那么可以拿过来复用，M 以前没有，那就新建一个。
