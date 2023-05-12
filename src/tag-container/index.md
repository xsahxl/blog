---
order: 8
toc: content
---

# TagContainer

## 何时使用

项目接入标签时，提供复杂的业务组件能力。

## 基本使用

```tsx
import '@alicloud/console-components/dist/wind.css';
import { TagContainer, sleep } from '@xsahxl/ui';
import axios from 'axios';
import _ from 'lodash';

const Demo = () => {
  const fetchData = async () => {
    await sleep(1000);
    const res = await axios(
      'https://listtagesources-mock-btkhjjvqkj.cn-chengdu.fcapp.run',
    );
    const data = _.get(res, 'data.data');
    return _.map(data, (item) => ({ key: item.TagKey, value: item.TagValue }));
  };
  return <TagContainer fetchData={fetchData} onChange={console.log} />;
};

export default Demo;
```

## value 回显

```tsx
import { TagContainer } from '@xsahxl/ui';
import axios from 'axios';
import _ from 'lodash';

const Demo = () => {
  const fetchData = async () => {
    const res = await axios(
      'https://listtagesources-mock-btkhjjvqkj.cn-chengdu.fcapp.run',
    );
    const data = _.get(res, 'data.data');
    return _.map(data, (item) => ({ key: item.TagKey, value: item.TagValue }));
  };
  return (
    <TagContainer
      fetchData={fetchData}
      value={[{ key: 'www', value: '11111111' }]}
      onChange={console.log}
    />
  );
};

export default Demo;
```

## limit

```tsx
import '@alicloud/console-components/dist/wind.css';
import { TagContainer } from '@xsahxl/ui';
import axios from 'axios';
import _ from 'lodash';

const Demo = () => {
  const fetchData = async () => {
    const res = await axios(
      'https://listtagesources-mock-btkhjjvqkj.cn-chengdu.fcapp.run',
    );
    const data = _.get(res, 'data.data');
    return _.map(data, (item) => ({ key: item.TagKey, value: item.TagValue }));
  };
  return (
    <TagContainer limit={3} fetchData={fetchData} onChange={console.log} />
  );
};

export default Demo;
```

## 校验

```tsx
import { Button, Field } from '@alicloud/console-components';
import { TagContainer } from '@xsahxl/ui';
import axios from 'axios';
import _ from 'lodash';

const { customValidate, customFormat } = TagContainer;
const FORM_LAYOUT = {
  labelCol: {
    fixedSpan: 6,
  },
  labelTextAlign: 'left',
};

const Demo = () => {
  const field = Field.useField();
  const { init, validate } = field;
  const fetchData = async () => {
    const res = await axios(
      'https://listtagesources-mock-btkhjjvqkj.cn-chengdu.fcapp.run',
    );
    const data = _.get(res, 'data.data');
    return _.map(data, (item) => ({ key: item.TagKey, value: item.TagValue }));
  };
  const onValidate = () => {
    validate((errors, values) => {
      console.log(errors, values);
      if (errors) return;
      const newValues = customFormat(values.tag);
      console.log('customFormat', newValues);
    });
  };

  return (
    <>
      <TagContainer
        fetchData={fetchData}
        {...init('tag', {
          rules: [
            {
              validator: customValidate,
            },
          ],
          props: {
            onChange: console.log,
          },
        })}
      />
      <Button className="mt-16" type="primary" onClick={onValidate}>
        校验
      </Button>
    </>
  );
};

export default Demo;
```

> 组件提供了默认的校验方法 `customValidate` 和 转化数据格式方法 `customFormat`

## ColumnTag

```tsx
import { TagContainer } from '@xsahxl/ui';
const { ColumnTag } = TagContainer;

export default () => {
  const dataSource = [
    {
      key: 'aaa',
      value: '5',
    },
    {
      key: 'dsadsad',
      value: 'dsadsad',
    },
    {
      key: 'sadsadsadsa',
      value: null,
    },
  ];
  return (
    <>
      <>
        有标签的场景：
        <ColumnTag
          dataSource={dataSource}
          onClick={() => console.log('点击了操作按钮')}
        />
      </>
      <div className="mt-16">
        无标签的场景：
        <ColumnTag onClick={() => console.log('点击了操作按钮')} />
      </div>
    </>
  );
};
```

## API

### TagContainer 的属性说明如下：

| 属性         | 说明                           | 类型                                             | 默认值    |
| ------------ | ------------------------------ | ------------------------------------------------ | --------- |
| value        | 值                             | {key: string, value: string}[]                   | -         |
| onChange     | 组件数据发生改变时，触发此事件 | (value: {key: string, value: string}[] ) => void | -         |
| fetchData    | 下拉框数据源                   | () => Promise<{ key: string, value: string }[]>  | -         |
| keyMaxLength | 标签键最大长度                 | number                                           | 64        |
| keyMaxLength | 标签值最大长度                 | number                                           | 64        |
| limit        | 最多可添加多少条数据           | number                                           | +Infinity |

### TagContainer.ColumnTag 的属性说明如下：

| 属性       | 说明                       | 类型                             | 默认值 |
| ---------- | -------------------------- | -------------------------------- | ------ |
| dataSource | 数据源                     | { key: string, value: string }[] | -      |
| onClick    | 点击添加或者编辑按钮的事件 | () => void                       | -      |
