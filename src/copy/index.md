# Copy

## 何时使用

目标元素需要被复制到剪贴板

## 基本使用

```tsx
import '@alicloud/console-components/dist/wind.css';
import { Copy } from '@xsahxl/ui';

const Demo = () => {
  const message = 'this is a message';
  return <Copy text={message}>{message}</Copy>;
};

export default Demo;
```

## showIcon

```tsx
import '@alicloud/console-components/dist/wind.css';
import { Copy } from '@xsahxl/ui';

const Demo = () => {
  const message = 'this is a message';
  return (
    <Copy text={message} showIcon>
      {message}
    </Copy>
  );
};

export default Demo;
```

## 自定义 icon 样式

```tsx
import { Icon } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import { Copy } from '@xsahxl/ui';

const Demo = () => {
  const message = 'this is a message';
  return (
    <Copy
      text={message}
      showIcon
      icon={
        <>
          <span>一键复制</span>
          <Icon className="ml-4" type="copy" size="xs" />
        </>
      }
    >
      {message}
    </Copy>
  );
};

export default Demo;
```

## API

| 属性     | 说明                 | 类型            | 默认值 |
| -------- | -------------------- | --------------- | ------ |
| children | 子节点               | React.ReactNode | -      |
| text     | 复制的内容           | string          | -      |
| showIcon | 是否默认显示复制按钮 | boolean         | false  |
| icon     | 自定义触发复制的元素 | React.ReactNode |        |
| iconSize | 指定图标大小         | IconSize        |        |

> IconSize 可枚举值：number,'xxs','xs','small','medium','large','xl','xxl','xxxl','inherit';
