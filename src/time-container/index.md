---
toc: content
---

# TimeContainer

## 何时使用

提供快捷方便的 默认时间选择、自定义时间选择，返回时间戳。

> 只有 快捷时间为['last_5_minutes', 'last_10_minutes', 'last_15_minutes', 'last_half_hour', 'last_hour', 'last_6_hours']时，才支持刷新频率功能。

## 基本使用

```tsx
import '@alicloud/console-components/dist/wind.css';
import { TimeContainer } from '@xsahxl/ui';

const Demo = () => {
  return <TimeContainer onChange={console.log} />;
};

export default Demo;
```

## Field 方式调用

```tsx
import { Field } from '@alicloud/console-components';
import { TimeContainer } from '@xsahxl/ui';
import { useEffect } from 'react';

export default () => {
  const field = Field.useField();
  const { init, getValue } = field;
  useEffect(() => {
    console.log(getValue('time'));
  }, [getValue('time')]);

  return <TimeContainer {...init('time')} />;
};
```

## 默认选中(string 类型)

```tsx
import { Field } from '@alicloud/console-components';
import { TimeContainer } from '@xsahxl/ui';

export default () => {
  const field = Field.useField();
  const { init, getValue } = field;

  return (
    <TimeContainer
      {...init('time', { initValue: 'last_5_minutes' })}
      onChange={console.log}
    />
  );
};
```

## 默认选中(时间戳和 moment 对象)

```tsx
import { Field } from '@alicloud/console-components';
import { TimeContainer } from '@xsahxl/ui';

export default () => {
  const field = Field.useField();
  const { init, getValue } = field;

  return (
    <TimeContainer
      {...init('time', { initValue: [1597999568648, 1598001368648] })}
      onChange={console.log}
    />
  );
};
```

## mode 为 offline

```tsx
import '@alicloud/console-components/dist/wind.css';
import { TimeContainer } from '@xsahxl/ui';

const Demo = () => {
  return <TimeContainer mode="offline" onChange={console.log} />;
};

export default Demo;
```

## showLoop

```tsx
import '@alicloud/console-components/dist/wind.css';
import { TimeContainer } from '@xsahxl/ui';

const Demo = () => {
  return <TimeContainer showLoop={false} onChange={console.log} />;
};

export default Demo;
```

## 自定义快捷时间

```tsx
import { Field } from '@alicloud/console-components';
import { TimeContainer } from '@xsahxl/ui';

export default () => {
  const field = Field.useField();
  const { init } = field;
  const quickTimes = [
    { key: 'minute', childs: ['last_5_minutes', 'last_15_minutes'] },
    { key: 'hour' },
    { key: 'day' },
  ];
  return (
    <TimeContainer
      quickTimes={quickTimes}
      {...init('time')}
      onChange={console.log}
    />
  );
};
```

## API

| 属性             | 说明                                        | 类型                                       | 默认值   |
| ---------------- | ------------------------------------------- | ------------------------------------------ | -------- |
| mode             | 默认快捷时间的类型，支持 realTime 和 offine | Enum                                       | realTime |
| value            | 当前值                                      | string\|number[]\|moment.Moment[]          | -        |
| onChange         | Select 发生改变时触发的回调                 | (data:{key:string,value: number[] })=>void | -        |
| quickTimes       | 快捷时间的数据源                            | string[]                                   | -        |
| showLoop         | 是否显示刷新频率                            | boolean                                    | true     |
| placeholder      | 输入提示                                    | string                                     | 请选择   |
| rangePickerProps | 透传给 RangePicker 组件属性                 | RangePickerProps                           | -        |

### 快捷时间粒度对应的 key

| 属性    | 说明 |
| ------- | ---- |
| minute  | 分   |
| hour    | 小时 |
| day     | 天   |
| week    | 周   |
| month   | 月   |
| quarter | 季度 |
| year    | 年度 |

### mode 为 realTime 时，选中默认快捷时间对应的值

| 属性              | 说明         |
| ----------------- | ------------ |
| last_5_minutes    | 最近 5 分钟  |
| last_10_minutes   | 最近 10 分钟 |
| last_15_minutes   | 最近 15 分钟 |
| last_half_hour    | 最近半小时   |
| last_hour         | 最近 1 小时  |
| last_6_hours      | 最近 6 小时  |
| half_one_day      | 半天         |
| today             | 今天         |
| last_three_days   | 近三天       |
| this_week         | 本周         |
| last_two_weeks    | 近两周       |
| last_three_weeks  | 近三周       |
| this_month        | 本月         |
| last_two_months   | 近两个月     |
| last_three_months | 近三个月     |

### mode 为 offline 时，选中默认快捷时间对应的值

| 属性                | 说明       |
| ------------------- | ---------- |
| today               | 今天       |
| yesterday           | 昨天       |
| last_three_days     | 近三天     |
| this_week           | 本周       |
| last_week           | 上周       |
| last_three_weeks    | 近三周     |
| this_month          | 本月       |
| last_month          | 上月       |
| last_three_months   | 近三个月   |
| this_quarter        | 本季度     |
| last_quarter        | 上一季度   |
| last_three_quarters | 近三个季度 |
| this_year           | 本年度     |
| last_year           | 上一年度   |
| last_three_years    | 近三年     |
