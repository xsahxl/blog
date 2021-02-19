# Mutation

## 何时使用

提交数据时候，此组件会抛出 data，loading, error 等信息

## 基本使用

```tsx
import React from 'react';
import { Mutation } from '@xsahxl/ui';
import { Button } from '@alicloud/console-components';

const Demo = () => {
  const fetchData = async () => {
    const data = await new Promise((resolve, reject) => {
      setTimeout(() => resolve(['小明', '小红']), 1000);
    });
    return data;
  };
  return (
    <Mutation
      onSubmit={fetchData}
      refetchQuery={() => console.log('refetchQuery')}
    >
      {(create, { data, loading }) => {
        return (
          <Button
            loading={loading}
            type="primary"
            onClick={create}
            style={{ marginLeft: 8 }}
          >
            创建
          </Button>
        );
      }}
    </Mutation>
  );
};

export default Demo;
```

## API

| 属性         | 说明                          | 类型     | 默认值 |
| ------------ | ----------------------------- | -------- | ------ |
| children     | 子节点                        | any      | -      |
| onSubmit     | 请求数据的函数                | Function | -      |
| onCompleted  | 请求数据完成触发事件          | Function | -      |
| onError      | 请求数据错误触发事件          | Function | -      |
| refetchQuery | onSubmit 完成后发起的数据请求 | Function | -      |

## render prop

| 属性    | 说明           | 类型    | 默认值 |
| ------- | -------------- | ------- | ------ |
| data    | 请求数据的结果 | any     | -      |
| loading | 请求数据的状态 | Boolean | false  |
| error   | 请求数据的错误 | any     | -      |
