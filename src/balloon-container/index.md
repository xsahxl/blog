---
toc: content
---

# BalloonContainer

基于 Balloon 组件封装，点击/鼠标移入元素，弹出气泡式的卡片浮层

## 何时使用

当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。提供默认的 kv 功能，针对 kv 可进行创建或修改操作

## 基本使用

```tsx
import '@alicloud/console-components/dist/wind.css';
import { BalloonContainer, sleep } from '@xsahxl/ui';

export default () => (
  <BalloonContainer
    title="新建标题"
    onConfirm={async value => {
      console.log('点击了确定', value);
      await sleep(1000);
    }}
    onCancel={() => console.log('点击了取消')}
  />
);
```

## dataSource

```tsx
import { Icon } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import { BalloonContainer, sleep } from '@xsahxl/ui';

const dataSource = [
  {
    label: '名称',
    name: 'name',
    value: '小明',
    props: {
      disabled: true,
    },
  },
  {
    label: '年龄',
    name: 'age',
    value: 28,
    props: {
      required: false,
      dataSource: [28, 29, 30],
    },
  },
];

export default () => (
  <BalloonContainer
    title="编辑标题"
    dataSource={dataSource}
    trigger={<Icon type="edit" size="xs" />}
    onConfirm={async value => {
      console.log('点击了确定', value);
      await sleep(1000);
    }}
    onCancel={() => console.log('点击了取消')}
  />
);
```

## 自定义

```tsx
import '@alicloud/console-components/dist/wind.css';
import { BalloonContainer } from '@xsahxl/ui';

export default () => (
  <BalloonContainer triggerType="hover" trigger="自定义">
    她发现孤独的人 准备动身 于是就祷告着黄昏 直到夜里 她转头听见 悲伤的呜咽 一个善良的女子 长发垂肩 她已跟随黄昏来临 翠绿的衣裳在炉火中 化为灰烬 升起火焰 一直烧到黎明
    一直到那女子推开门离去 她自言自语 在离这很远的地方 有一片海滩 孤独的人他就在海上 撑着船帆 如果你看到 他回到海岸 就请你告诉他 你的名字我的名字 莉莉安
  </BalloonContainer>
);
```

## API

| 属性        | 说明                               | 类型                                      | 默认值 |
| ----------- | ---------------------------------- | ----------------------------------------- | ------ |
| children    | 子节点                             | React.ReactNode                           | -      |
| title       | 标题                               | React.ReactNode                           | -      |
| trigger     | 触发元素                           | React.ReactNode                           | -      |
| triggerType | 触发方式, 可选值：'click', 'hover' | enum                                      | click  |
| dataSource  | 数据源                             | [Item](#item)[]                           | -      |
| onConfirm   | 确定按钮事件                       | (value: [Item](#item)[]) => Promise<any\> | -      |
| onCancel    | 取消按钮事件                       | () => void                                | -      |

### Item

| 属性  | 说明                 | 类型                | 默认值 |
| ----- | -------------------- | ------------------- | ------ |
| lable | 自定义内联 label     | string              | -      |
| value | 当前值，用于受控模式 | string              | -      |
| name  | 组件 init 字段       | string              | -      |
| props | 组件接收的 props     | Record<string, any> |        |
