# 防抖与节流

## 防抖

在触发一次函数后的规定时间内没有再次触发才执行

## 防抖函数的应用场景
- 搜索框实时搜索
- 表单输入验证
- 鼠标移动事件

以下是一个 JavaScript 实现的防抖函数：

```js
function debounce(fn, wait) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  }
}
```
## 防抖函数调用

```js
const test = (v) => {
  console.log(v)
}
const t = debounce(test, 1000)
Promise.all([test('a'), test('b')]) // a b
Promise.all([t('a'), t('b')]) // b
```
## 节流
连续触发事件，在规定时间内只执行一次

## 节流函数的应用场景
- 页面滚动事件
- 窗口大小调整
- 频繁点击按钮
- 动画场景
- 拖拽场景

以下是一个 JavaScript 实现的节流函数：

```js
function throttle(fn, wait) {
  let last = 0;
  return function (...args) {
    if (Date.now() - last > wait) {
      fn.apply(this, args)
      last = Date.now();
    }
  }
}
```

## 节流函数调用

```js
const test = (v) => {
  console.log(v)
}
const t = throttle(test, 1000)
Promise.all([test('a'), test('b')]) // a b
Promise.all([t('a'), t('b')]) // a
```