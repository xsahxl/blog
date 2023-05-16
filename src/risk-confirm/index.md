---
order: 6
toc: content
---

# RiskConfirm

## 何时使用

高危操作，二次弹窗确认

## 基本使用

```tsx
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import { RiskConfirm, sleep } from '@xsahxl/ui';

export default () => (
  <RiskConfirm
    title="释放部署环境"
    message="该操作会导致ECS资源被释放且不可恢复，请谨慎执行并确保已对ECS中的数据进行了备份。请在以下文本框中输入部署环境名称（shl）来确认执行此操作。"
    confirmKey="shl"
    confirmPlaceholer="请输入当前部署的环境名称"
    onConfirm={async () => {
      await sleep(1000);
      console.log('点击了确认按钮');
    }}
  >
    <Button warning>删除</Button>
  </RiskConfirm>
);
```

## API

| 属性              | 说明                                     | 类型                      | 默认值 |
| ----------------- | ---------------------------------------- | ------------------------- | ------ |
| children          | 子元素                                   | React.ReactNode           | -      |
| title             | 弹窗标题                                 | React.ReactNode           | 提示   |
| message           | 弹窗 body 内提示信息                     | string \| React.ReactNode | -      |
| riskInfo          | 弹窗 body 内 具体风险点 提示信息         | React.ReactNode           | -      |
| disabled          | 点击 Popconfirm 子元素是否弹出气泡确认框 | boolean                   | false  |
| confirmKey        | 确认删除操作的 key                       | string                    | -      |
| confirmPlaceholer | 确认删除操作的 placeholder               | string                    | -      |
| onConfirm         | 确认按钮的点击事件                       | ()=>Promise<any\>         | -      |
| onCancel          | 取消按钮的点击事件                       | () => void                | -      |
