---
order: 5
toc: content
---

# QRCode

## 何时使用

当需要将链接转换成为二维码时使用。

## 基本使用

```tsx
import '@alicloud/console-components/dist/wind.css';
import { QRCode } from '@xsahxl/ui';
export default () => <QRCode value={'https://github.com/xsahxl/blog'} />;
```

## 带 logo 例子

```tsx
import { QRCode } from '@xsahxl/ui';
export default () => (
  <QRCode
    value={'https://github.com/xsahxl/blog'}
    logo="https://img.alicdn.com/tfs/TB1d_KkfQcx_u4jSZFlXXXnUFXa-200-200.png"
  />
);
```

## 过期状态

```tsx
import { QRCode } from '@xsahxl/ui';

export default () => (
  <QRCode
    value={'https://github.com/xsahxl/blog'}
    expired
    onRefresh={() => console.log('refresh click!')}
  />
);
```

## 浮层带 logo 例子

```tsx
import { QRCode } from '@xsahxl/ui';

export default () => (
  <QRCode
    value={'https://github.com/xsahxl/blog'}
    logo="https://img.alicdn.com/tfs/TB1d_KkfQcx_u4jSZFlXXXnUFXa-200-200.png"
    trigger="触发元素"
  />
);
```

## API

| 属性      | 说明                              | 类型                | 默认值    |
| --------- | --------------------------------- | ------------------- | --------- |
| value     | 扫描后的地址                      | string              | -         |
| renderAs  | 渲染方法，可选值：'canvas' 'svg'  | enum                | canvas    |
| logo      | 二维码中图片的地址                | string              | -         |
| size      | 二维码图片大小                    | number              | 128       |
| bgColor   | 二维码背景颜色                    | string              | '#FFFFFF' |
| fgColor   | 二维码前景的颜色                  | string              | '#000000' |
| level     | 安全等级，可选值：'L' 'M' 'Q' 'H' | enum                | L         |
| trigger   | 浮层的触发元素                    | React.ReactNode     | -         |
| expired   | 是否过期                          | boolean             | false     |
| onRefresh | 点击刷新的回调                    | () => Promise<any\> | noop      |
