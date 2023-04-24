---
group:
  title: note
toc: content
---

# this 指向问题

- this 永远指向最后调用它的那个对象
- 匿名函数的 this 永远指向 window
- 使用.call()或者.apply()的函数是会直接执行的
- bind()是创建一个新的函数，需要手动调用才会执行
- 如果 call、apply、bind 接收到的第一个参数是空或者 null、undefined 的话，则会忽略这个参数
- forEach、map、filter 函数的第二个参数也是能显式绑定 this 的
- 箭头函数里面的 this 是由外层作用域来决定的，且指向函数定义时的 this 而非执行时
- 字面量创建的对象，作用域是 window，如果里面有箭头函数属性的话，this 指向的是 window
- 构造函数创建的对象，作用域是可以理解为是这个构造函数，且这个构造函数的 this 是指向新建的对象的，因此 this 指向这个对象。

## 根据箭头函数的特性，所以我们应该避免在以下四种场景中使用它：

- 使用箭头函数定义对象的方法

```js
let obj = {
  value: 'LinDaiDai',
  getValue: () => console.log(this.value),
};
obj.getValue(); // undefined
```

- 定义原型方法

```js
function Foo(value) {
  this.value = value;
}
Foo.prototype.getValue = () => console.log(this.value);

const foo1 = new Foo(1);
foo1.getValue(); // undefined
```

- 构造函数使用箭头函数

```js
const Foo = (value) => {
  this.value = value;
};
const foo1 = new Foo(1);
// 事实上直接就报错了 Uncaught TypeError: Foo is not a constructor
console.log(foo1);
```

- 作为事件的回调函数

```js
const button = document.getElementById('myButton');
button.addEventListener('click', () => {
  console.log(this === window); // => true
  this.innerHTML = 'Clicked button';
});
```
