# this指向

在 javascript 中，函数在内存中都是单独存储的，即使是对象内定义的函数，这就使得函数和其它基本类型的数据一样，是可以赋值给任何变量的。这样一来，函数运行就会在不同的环境运行，所以就需要有一种机制在函数内部可以获得当前的运行环境（context），所以 `this` 就出现了，它的设计目的就是指代函数当前的运行环境。

## 直接调用 method()
- 非严格模式，`this` 指向全局对象
- 严格模式，`this` 指向 `undefined`

```js
function fn() {
  'use strict';
  console.log(this);
}
fn()
// undefined
```

## new method()调用
this指向 新对象

```js
function fn() {
  this.name = 'steven'
  console.log(this)
}
new fn();
// fn { name: 'steven' }
```

## obj.method()调用
this指向 obj

```js
function fn() {
  console.log(this.name)
}
const obj = {
  name: 'tom'
}
obj.fn = fn;
obj.fn();
// tom
```

## apply,call,bind（method.apply(xx)）
this指向第一个参数


> 箭头函数里的this指向 取决于箭头函数定义的位置，在编译的时候就确定了
