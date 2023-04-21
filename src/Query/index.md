# Query

:::warning
refreshIndex 属性的初始值务必设置为 0，非 0 的 case 下会引起 fetchData 函数请求两次
:::

## 何时使用

请求数据时候，此组件内置了刷新，轮询等功能，抛出 data，loading, error 等信息

## 基本使用

```tsx
import { Button, Select, Switch } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import { Query, sleep } from '@xsahxl/ui';
import { useState } from 'react';

const Demo = () => {
  const fetchData = async () => {
    console.log('触发了fetchData方法');
    console.time('time');
    await sleep(3000);
    console.timeEnd('time');
    return ['a', 'b'];
  };
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [loop, setLoop] = useState({ enable: false, time: 3000 });
  const handlePolling = (value) => {
    setLoop({ ...loop, enable: value });
  };

  return (
    <Query fetchData={fetchData} refreshIndex={refreshIndex} loop={loop}>
      {({ data, loading }) => {
        return (
          <>
            <div style={{ marginBottom: 16 }}>
              <span>轮询功能:</span>
              <Switch style={{ marginLeft: 8 }} onChange={handlePolling} />
            </div>
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
          </>
        );
      }}
    </Query>
  );
};

export default Demo;
```

## API

| 属性         | 说明                 | 类型                                                 | 默认值                         |
| ------------ | -------------------- | ---------------------------------------------------- | ------------------------------ |
| children     | 子节点               | (options: [RenderProps](#renderprops) ) => ReactNode | -                              |
| fetchData    | 请求数据的函数       | () => Promise<any\>                                  | -                              |
| refreshIndex | 刷新数据             | number                                               | -                              |
| autoFetch    | 是否自动获取数据源   | boolean                                              | true                           |
| loop         | 接口是否轮询         | Loop                                                 | { enable: false, time: 10000 } |
| onCompleted  | 请求数据完成触发事件 | () => Promise<any\>                                  | -                              |
| onError      | 请求数据错误触发事件 | () => Promise<any\>                                  | -                              |

### Loop

| 属性   | 说明         | 类型    | 默认值 |
| ------ | ------------ | ------- | ------ |
| enable | 是否开启轮询 | boolean | false  |
| time   | 轮询间隔时间 | number  | 10000  |

### RenderProps

| 属性    | 说明           | 类型    | 默认值 |
| ------- | -------------- | ------- | ------ |
| data    | 请求数据的结果 | any     | -      |
| loading | 请求数据的状态 | boolean | false  |
| error   | 请求数据的错误 | Error   | -      |
