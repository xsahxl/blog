# 防抖与节流

## 防抖(debounce)

- 从字面上理解，防止函数抖动，那么函数为什么会抖动？就是在我们还没有完全确认此刻操作的时候频繁执行函数，防抖就是合并我们的函数执行（多个欲执行函数到约定的时间点后再合并执行）。只有触发操作后超过指定的间隔说明这一次触发才有效，否则就要重新计时等待。

```js
function debounce(fc, wait = 500) {
  let timeout;
  return function(...args) {
    timeout && clearTimeout(timer);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}
```

## 节流(throttle)

- 从字面上理解，就是节约函数的执行次数(约定一定的时间执行一次)，在我们进行一些高频执行函数的操作中可以应用。

```js
function throttle(fn, delay = 500) {
  let canRun = true;
  return function(...args) {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, args);
      canRun = true;
    }, delay);
  };
}
```
