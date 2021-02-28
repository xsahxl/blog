# Query

<Alert type="warning">
  <strong>refreshIndex 属性的初始值务必设置为 0，非 0 的 case 下会引起 fetchData 函数请求两次</strong>
</Alert>

## 何时使用

请求数据时候，此组件内置了刷新，轮询等功能，抛出 data，loading, error 等信息

## 基本使用

```tsx
import React, { useState } from 'react';
import { Query } from '@xsahxl/ui';
import { Button, Select } from '@alicloud/console-components';

const Demo = () => {
  const fetchData = async () => {
    const data = await new Promise((resolve, reject) => {
      setTimeout(() => resolve(['小明', '小红']), 1000);
    });
    return data;
  };
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [loop, setLoop] = useState({ enable: false });

  return (
    <Query fetchData={fetchData} refreshIndex={refreshIndex} loop={loop}>
      {({ data, loading }) => {
        return (
          <>
            <Select dataSource={data} />
            <Button
              loading={loading}
              type="primary"
              text
              onClick={() => setRefreshIndex(+new Date())}
              style={{ marginLeft: 8 }}
            >
              刷新
            </Button>
            <Button
              type="primary"
              text
              onClick={() => setLoop({ enable: true })}
              style={{ marginLeft: 8 }}
            >
              开始轮询
            </Button>
            <Button
              type="primary"
              text
              onClick={() => setLoop({ enable: false })}
              style={{ marginLeft: 8 }}
            >
              结束轮询
            </Button>
          </>
        );
      }}
    </Query>
  );
};

export default Demo;
```

## API

| 属性         | 说明                 | 类型     | 默认值                         |
| ------------ | -------------------- | -------- | ------------------------------ |
| children     | 子节点               | any      | -                              |
| fetchData    | 请求数据的函数       | Function | -                              |
| refreshIndex | 刷新数据             | Number   | -                              |
| autoFetch    | 是否自动获取数据源   | Boolean  | true                           |
| loop         | 接口是否轮询         | Object   | { enable: false, time: 10000 } |
| onCompleted  | 请求数据完成触发事件 | Function | -                              |
| onError      | 请求数据错误触发事件 | Function | -                              |

## render prop

| 属性    | 说明           | 类型    | 默认值 |
| ------- | -------------- | ------- | ------ |
| data    | 请求数据的结果 | any     | -      |
| loading | 请求数据的状态 | Boolean | false  |
| error   | 请求数据的错误 | any     | -      |
