# KeyValue

## 何时使用

在环境变量等多条键值对的时候可以使用 KeyValue

## 基本使用

```tsx
import '@alicloud/console-components/dist/wind.css';
import { KeyValue } from '@xsahxl/ui';

const Demo = () => {
  return <KeyValue onChange={console.log} />;
};

export default Demo;
```

## value 回显

```tsx
import '@alicloud/console-components/dist/wind.css';
import { KeyValue } from '@xsahxl/ui';

const Demo = () => {
  return <KeyValue value={[{ key: 'a', value: 1 }]} onChange={console.log} />;
};

export default Demo;
```

## 校验

```tsx
import { Button, Field, Form } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import { FORM_LAYOUT, KeyValue, customValidate } from '@xsahxl/ui';

const Demo = () => {
  const field = Field.useField();
  const { init, validate } = field;
  const onValidate = () => {
    validate((errors, values) => {
      if (errors) return;
    });
  };

  return (
    <Form field={field} {...FORM_LAYOUT}>
      <Form.Item label="环境变量" required>
        <KeyValue
          {...init('env', {
            rules: [
              {
                validator: customValidate,
              },
            ],
          })}
        />
      </Form.Item>
      <Button type="primary" onClick={onValidate}>
        校验
      </Button>
    </Form>
  );
};

export default Demo;
```

> 组件提供了默认的校验方法 `customValidate` 和 转化数据格式方法 `customFormat`

## API

| 属性            | 说明                   | 类型            | 默认值 |
| --------------- | ---------------------- | --------------- | ------ |
| value           | 值                     | [Item](#item)[] | -      |
| onChange        | 数据发生改变时触发事件 | () => void      | -      |
| prefixKeyText   | key 输入框前附加文字   | string          | Key    |
| prefixValueText | value 输入框前附加文字 | string          | Value  |

### Item

| 属性  | 说明  | 类型   | 默认值 |
| ----- | ----- | ------ | ------ |
| key   | key   | string | -      |
| value | value | string | -      |
