---
toc: content
---

# BackToTop

## 何时使用

回到顶部

## 基本使用

```tsx
import { BackToTop } from '@xsahxl/ui';

const Demo = () => {
  return (
    <>
      <h1>
        您可以在当前页面向下滚动，默认大约滚动200px的时候，右下角会出现一个
        回到顶部的 图标，此时点击图标就会滚动到顶部。
      </h1>
      {Array(17)
        .fill(0)
        .map((item) => (
          <div>placeholder</div>
        ))}
      <BackToTop />
    </>
  );
};

export default Demo;
```

## API

| 属性      | 说明                                 | 类型   | 默认值 |
| --------- | ------------------------------------ | ------ | ------ |
| threshold | 阀值（滚动多少会出现回到顶部的图标） | number | 200    |
