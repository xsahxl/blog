---
toc: content
---

# DownloadExcel

## 何时使用

导出数据保存到 excel 文件

## 基本使用

```tsx
import { Button } from '@alicloud/console-components';
import { DownloadExcel } from '@xsahxl/ui';

const Demo = () => {
  return (
    <DownloadExcel
      filename="download-excel-test"
      head={['UID']}
      body={[[111], [222]]}
    >
      <Button type="primary" text>
        导出数据
      </Button>
    </DownloadExcel>
  );
};

export default Demo;
```

## API

| 属性     | 说明      | 类型       | 默认值 |
| -------- | --------- | ---------- | ------ |
| filename | 文件名称  | string     | demo   |
| head     | 头部数据  | string[]   |        |
| body     | body 数据 | string[][] |        |
