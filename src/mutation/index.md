# Mutation

## 何时使用

提交数据时，此组件会抛出 data，loading, error 等信息

## 基本使用

```tsx
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import { Mutation, sleep } from '@xsahxl/ui';
import moment from 'moment';

const Demo = () => {
  const submit = async () => {
    await sleep(1000);
    return { time: moment().format('YYYY-MM-DD HH:mm:ss') };
  };
  return (
    <Mutation onSubmit={submit} refetchQuery={async () => console.log('refetchQuery')}>
      {(create, { data, loading }) => {
        return (
          <>
            <Button loading={loading} type="primary" onClick={create} style={{ marginLeft: 8 }}>
              创建
            </Button>
            <pre>{JSON.stringify(data)}</pre>
          </>
        );
      }}
    </Mutation>
  );
};

export default Demo;
```

## API

| 属性         | 说明                          | 类型                                                                                  | 默认值 |
| ------------ | ----------------------------- | ------------------------------------------------------------------------------------- | ------ |
| children     | 子节点                        | (submit: () => Promise<any\>, options: [RenderProps](#renderprops) => React.ReactNode | -      |
| onSubmit     | 请求数据的函数                | () => Promise<any\>                                                                   | -      |
| onCompleted  | 请求数据完成触发事件          | () => Promise<any\>                                                                   | -      |
| onError      | 请求数据错误触发事件          | () => Promise<any\>                                                                   | -      |
| refetchQuery | onSubmit 完成后发起的数据请求 | () => Promise<any\>                                                                   | -      |

### RenderProps

| 属性    | 说明           | 类型    | 默认值 |
| ------- | -------------- | ------- | ------ |
| data    | 请求数据的结果 | any     | -      |
| loading | 请求数据的状态 | boolean | false  |
| error   | 请求数据的错误 | Error   | -      |
