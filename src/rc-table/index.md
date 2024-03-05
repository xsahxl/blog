# Table

> 如果使用 refreshIndex 属性，初始值应设置为 0，设置为非 0 时, 第一次加载时可能造成 fetchData 函数执行两次

## basic

```tsx
import React from 'react';
import { RcTable, sleep } from '@xsahxl/ui';
import axios from 'axios';
import '@alicloud/console-components/dist/wind.css';
import Cookie from 'js-cookie';

Cookie.set('aliyun_lang', 'zh');

const Demo = () => {
  const columns = [
    {
      key: 'InstanceName',
      title: '实例名称',
      dataIndex: 'InstanceName',
      width: 300,
    },
    {
      key: 'Address',
      title: 'IP地址',
      dataIndex: 'Address',
      width: 300,
    },
    {
      key: 'CreationTime',
      title: '创建时间',
      width: 300,
      dataIndex: 'CreationTime',
      sortable: true,
    },
    {
      key: 'Status',
      title: '状态',
      dataIndex: 'Status',
      width: 300,
    },
  ];
  const fetchData = async params => {
    console.log('params', params);
    await sleep(500);
    const res = await axios.get('https://mock.presstime.cn/mock/645db7465bbac3001ab907c8/api/tablelist', {
      params,
    });
    console.log(res);
    return {
      data: res.data.data.Instances.Instance,
      total: res.data.data.TotalCount,
    };
  };
  return (
    <RcTable
      columns={columns}
      fetchData={fetchData}
      pagination={{
        current: 1,
        pageSize: 10,
        total: 40,
      }}
    />
  );
};

export default Demo;
```

## refreshIndex

```tsx
import React, { useState } from 'react';
import { RcTable, sleep } from '@xsahxl/ui';
import axios from 'axios';
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';

const Demo = () => {
  const [refreshIndex, setRefreshIndex] = useState(0);
  const columns = [
    {
      key: 'InstanceName',
      title: '实例名称',
      dataIndex: 'InstanceName',
      width: 300,
    },
    {
      key: 'Address',
      title: 'IP地址',
      dataIndex: 'Address',
      width: 300,
    },
    {
      key: 'CreationTime',
      title: '创建时间',
      width: 300,
      dataIndex: 'CreationTime',
      sortable: true,
    },
    {
      key: 'Status',
      title: '状态',
      dataIndex: 'Status',
      width: 300,
    },
  ];
  const fetchData = async params => {
    console.log('params', params);
    await sleep(500);
    const res = await axios.get('https://mock.presstime.cn/mock/645db7465bbac3001ab907c8/api/tablelist', {
      params,
    });
    console.log(res);
    return {
      data: res.data.data.Instances.Instance,
      total: res.data.data.TotalCount,
    };
  };
  return (
    <RcTable
      columns={columns}
      fetchData={fetchData}
      refreshIndex={refreshIndex}
      pagination={{
        current: 1,
        pageSize: 10,
        total: 40,
      }}
      operation={
        <Button type="primary" onClick={() => setRefreshIndex(Date.now())}>
          手动刷新
        </Button>
      }
    />
  );
};

export default Demo;
```

## showRefreshButton

```tsx
import React, { useState } from 'react';
import { RcTable, sleep } from '@xsahxl/ui';
import axios from 'axios';
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';

const Demo = () => {
  const columns = [
    {
      key: 'InstanceName',
      title: '实例名称',
      dataIndex: 'InstanceName',
      width: 300,
    },
    {
      key: 'Address',
      title: 'IP地址',
      dataIndex: 'Address',
      width: 300,
    },
    {
      key: 'CreationTime',
      title: '创建时间',
      width: 300,
      dataIndex: 'CreationTime',
      sortable: true,
    },
    {
      key: 'Status',
      title: '状态',
      dataIndex: 'Status',
      width: 300,
    },
  ];
  const fetchData = async params => {
    console.log('params', params);
    await sleep(500);
    const res = await axios.get('https://mock.presstime.cn/mock/645db7465bbac3001ab907c8/api/tablelist', {
      params,
    });
    console.log(res);
    return {
      data: res.data.data.Instances.Instance,
      total: res.data.data.TotalCount,
    };
  };
  return <RcTable columns={columns} fetchData={fetchData} showRefreshButton operation={<Button type="primary">创建应用</Button>} />;
};

export default Demo;
```

## search

```tsx
import React, { useState } from 'react';
import { RcTable, sleep } from '@xsahxl/ui';
import axios from 'axios';
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';

const Demo = () => {
  const [refreshIndex, setRefreshIndex] = useState(0);
  const columns = [
    {
      key: 'InstanceName',
      title: '实例名称',
      dataIndex: 'InstanceName',
      width: 300,
    },
    {
      key: 'Address',
      title: 'IP地址',
      dataIndex: 'Address',
      width: 300,
    },
    {
      key: 'CreationTime',
      title: '创建时间',
      width: 300,
      dataIndex: 'CreationTime',
      sortable: true,
    },
    {
      key: 'Status',
      title: '状态',
      dataIndex: 'Status',
      width: 300,
    },
  ];
  const search = {
    defaultDataIndex: 'name',
    defaultSelectedDataIndex: 'name',
    options: [
      {
        label: '实例名称',
        dataIndex: 'name',
        template: 'input',
        templateProps: {
          placeholder: '按实例名称搜索',
        },
      },
      {
        label: '网络类型',
        dataIndex: 'type',
        template: 'select',
        templateProps: {
          placeholder: '请选择网络类型',
          dataSource: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' },
            { label: 'D', value: 'd' },
          ],
        },
      },
      {
        label: '付费类型',
        dataIndex: 'pay',
        template: 'multiple',
        templateProps: {
          placeholder: '请选择付费类型',
          dataSource: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' },
            { label: 'D', value: 'd' },
          ],
        },
      },
    ],
  };
  const fetchData = async params => {
    console.log('params', params);
    await sleep(500);
    const res = await axios.get('https://mock.presstime.cn/mock/645db7465bbac3001ab907c8/api/tablelist', {
      params,
    });
    console.log(res);
    return {
      data: res.data.data.Instances.Instance,
      total: res.data.data.TotalCount,
    };
  };
  return (
    <RcTable
      columns={columns}
      fetchData={fetchData}
      refreshIndex={refreshIndex}
      showRefreshButton
      operation={
        <Button type="primary" onClick={() => setRefreshIndex(Date.now())}>
          手动刷新
        </Button>
      }
      search={search}
    />
  );
};

export default Demo;
```

## recordCurrent

```tsx
import React, { useState } from 'react';
import { RcTable, sleep } from '@xsahxl/ui';
import axios from 'axios';
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';

const Demo = () => {
  const [refreshIndex, setRefreshIndex] = useState(0);
  const columns = [
    {
      key: 'InstanceName',
      title: '实例名称',
      dataIndex: 'InstanceName',
      width: 300,
    },
    {
      key: 'Address',
      title: 'IP地址',
      dataIndex: 'Address',
      width: 300,
    },
    {
      key: 'CreationTime',
      title: '创建时间',
      width: 300,
      dataIndex: 'CreationTime',
      sortable: true,
    },
    {
      key: 'Status',
      title: '状态',
      dataIndex: 'Status',
      width: 300,
    },
  ];
  const search = {
    defaultDataIndex: 'name',
    defaultSelectedDataIndex: 'name',
    options: [
      {
        label: '实例名称',
        dataIndex: 'name',
        template: 'input',
        templateProps: {
          placeholder: '按实例名称搜索',
        },
      },
      {
        label: '网络类型',
        dataIndex: 'type',
        template: 'select',
        templateProps: {
          placeholder: '请选择网络类型',
          dataSource: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' },
            { label: 'D', value: 'd' },
          ],
        },
      },
      {
        label: '付费类型',
        dataIndex: 'pay',
        template: 'multiple',
        templateProps: {
          placeholder: '请选择付费类型',
          dataSource: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' },
            { label: 'D', value: 'd' },
          ],
        },
      },
    ],
  };
  const fetchData = async params => {
    console.log('params', params);
    await sleep(500);
    const res = await axios.get('https://mock.presstime.cn/mock/645db7465bbac3001ab907c8/api/tablelist', {
      params,
    });
    console.log(res);
    return {
      data: res.data.data.Instances.Instance,
      total: res.data.data.TotalCount,
    };
  };
  return (
    <RcTable
      columns={columns}
      fetchData={fetchData}
      refreshIndex={refreshIndex}
      recordCurrent
      showRefreshButton
      operation={
        <Button type="primary" onClick={() => setRefreshIndex(Date.now())}>
          手动刷新
        </Button>
      }
      search={search}
    />
  );
};

export default Demo;
```

## search children

```tsx
import React, { useState } from 'react';
import { RcTable, sleep } from '@xsahxl/ui';
import axios from 'axios';
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';

const Demo = () => {
  const [refreshIndex, setRefreshIndex] = useState(0);
  const columns = [
    {
      key: 'InstanceName',
      title: '实例名称',
      dataIndex: 'InstanceName',
      width: 300,
    },
    {
      key: 'Address',
      title: 'IP地址',
      dataIndex: 'Address',
      width: 300,
    },
    {
      key: 'CreationTime',
      title: '创建时间',
      width: 300,
      dataIndex: 'CreationTime',
      sortable: true,
    },
    {
      key: 'Status',
      title: '状态',
      dataIndex: 'Status',
      width: 300,
    },
  ];
  const search = {
    children: <Button>自定义内容</Button>,
    defaultDataIndex: 'name',
    defaultSelectedDataIndex: 'name',
    options: [
      {
        label: '实例名称',
        dataIndex: 'name',
        template: 'input',
        templateProps: {
          placeholder: '按实例名称搜索',
        },
      },
      {
        label: '网络类型',
        dataIndex: 'type',
        template: 'select',
        templateProps: {
          placeholder: '请选择网络类型',
          dataSource: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' },
            { label: 'D', value: 'd' },
          ],
        },
      },
      {
        label: '付费类型',
        dataIndex: 'pay',
        template: 'multiple',
        templateProps: {
          placeholder: '请选择付费类型',
          dataSource: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' },
            { label: 'D', value: 'd' },
          ],
        },
      },
    ],
  };
  const fetchData = async params => {
    console.log('params', params);
    await sleep(500);
    const res = await axios.get('https://mock.presstime.cn/mock/645db7465bbac3001ab907c8/api/tablelist', {
      params,
    });
    console.log(res);
    return {
      data: res.data.data.Instances.Instance,
      total: res.data.data.TotalCount,
    };
  };
  return (
    <RcTable
      columns={columns}
      fetchData={fetchData}
      refreshIndex={refreshIndex}
      recordCurrent
      showRefreshButton
      operation={
        <Button type="primary" onClick={() => setRefreshIndex(Date.now())}>
          手动刷新
        </Button>
      }
      search={search}
    />
  );
};

export default Demo;
```

## search default value

```tsx
import React, { useState } from 'react';
import { RcTable, sleep } from '@xsahxl/ui';
import axios from 'axios';
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';

const Demo = () => {
  const [refreshIndex, setRefreshIndex] = useState(0);
  const columns = [
    {
      key: 'InstanceName',
      title: '实例名称',
      dataIndex: 'InstanceName',
      width: 300,
    },
    {
      key: 'Address',
      title: 'IP地址',
      dataIndex: 'Address',
      width: 300,
    },
    {
      key: 'CreationTime',
      title: '创建时间',
      width: 300,
      dataIndex: 'CreationTime',
      sortable: true,
    },
    {
      key: 'Status',
      title: '状态',
      dataIndex: 'Status',
      width: 300,
    },
  ];
  const search = {
    children: <Button>自定义内容</Button>,
    defaultDataIndex: 'name',
    defaultSelectedDataIndex: 'name',
    options: [
      {
        label: '实例名称',
        dataIndex: 'name',
        template: 'input',
        templateProps: {
          placeholder: '按实例名称搜索',
        },
        defaultValue: 'abc',
      },
      {
        label: '网络类型',
        dataIndex: 'type',
        template: 'select',
        templateProps: {
          placeholder: '请选择网络类型',
          dataSource: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' },
            { label: 'D', value: 'd' },
          ],
        },
        defaultValue: 'c',
      },
      {
        label: '付费类型',
        dataIndex: 'pay',
        template: 'multiple',
        templateProps: {
          placeholder: '请选择付费类型',
          dataSource: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' },
            { label: 'D', value: 'd' },
          ],
        },
        defaultValue: ['a', 'd'],
      },
    ],
  };
  const fetchData = async params => {
    console.log('params', params);
    await sleep(500);
    const res = await axios.get('https://mock.presstime.cn/mock/645db7465bbac3001ab907c8/api/tablelist', {
      params,
    });
    console.log(res);
    return {
      data: res.data.data.Instances.Instance,
      total: res.data.data.TotalCount,
    };
  };
  return (
    <RcTable
      columns={columns}
      fetchData={fetchData}
      refreshIndex={refreshIndex}
      recordCurrent
      showRefreshButton
      operation={
        <Button type="primary" onClick={() => setRefreshIndex(Date.now())}>
          手动刷新
        </Button>
      }
      search={search}
    />
  );
};

export default Demo;
```

## selection

```tsx
import React, { useState } from 'react';
import { RcTable, sleep } from '@xsahxl/ui';
import axios from 'axios';
import { Button, Badge } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';

const Demo = () => {
  const [refreshIndex, setRefreshIndex] = useState(0);
  const columns = [
    {
      key: 'InstanceName',
      title: '实例名称',
      dataIndex: 'InstanceName',
      width: 300,
    },
    {
      key: 'Address',
      title: 'IP地址',
      dataIndex: 'Address',
      width: 300,
    },
    {
      key: 'CreationTime',
      title: '创建时间',
      width: 300,
      dataIndex: 'CreationTime',
      sortable: true,
    },
    {
      key: 'Status',
      title: '状态',
      dataIndex: 'Status',
      width: 300,
    },
  ];
  const search = {
    children: <Button>自定义内容</Button>,
    defaultDataIndex: 'name',
    defaultSelectedDataIndex: 'name',
    options: [
      {
        label: '实例名称',
        dataIndex: 'name',
        template: 'input',
        templateProps: {
          placeholder: '按实例名称搜索',
        },
        defaultValue: 'abc',
      },
      {
        label: '网络类型',
        dataIndex: 'type',
        template: 'select',
        templateProps: {
          placeholder: '请选择网络类型',
          dataSource: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' },
            { label: 'D', value: 'd' },
          ],
        },
        defaultValue: 'c',
      },
      {
        label: '付费类型',
        dataIndex: 'pay',
        template: 'multiple',
        templateProps: {
          placeholder: '请选择付费类型',
          dataSource: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' },
            { label: 'D', value: 'd' },
          ],
        },
        defaultValue: ['a', 'd'],
      },
    ],
  };
  const fetchData = async params => {
    console.log('params', params);
    await sleep(500);
    const res = await axios.get('https://mock.presstime.cn/mock/645db7465bbac3001ab907c8/api/tablelist', {
      params,
    });
    console.log(res);
    return {
      data: res.data.data.Instances.Instance,
      total: res.data.data.TotalCount,
    };
  };
  return (
    <RcTable
      className="cc"
      style={{ color: '#333' }}
      columns={columns}
      fetchData={fetchData}
      refreshIndex={refreshIndex}
      recordCurrent
      showRefreshButton
      operation={
        <Button type="primary" onClick={() => setRefreshIndex(Date.now())}>
          手动刷新
        </Button>
      }
      search={search}
      primaryKey="InstanceId"
      selection={({ selectedRowKeys }: { selectedRowKeys: any[] }) => {
        return (
          <Badge count={selectedRowKeys.length}>
            <Button disabled={selectedRowKeys.length === 0}>Delete</Button>
          </Badge>
        );
      }}
    />
  );
};

export default Demo;
```

## onlySupportOne

```tsx
import React, { useState } from 'react';
import { RcTable, sleep } from '@xsahxl/ui';
import axios from 'axios';
import { Button, Badge } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';

const Demo = () => {
  const [refreshIndex, setRefreshIndex] = useState(0);
  const columns = [
    {
      key: 'InstanceName',
      title: '实例名称',
      dataIndex: 'InstanceName',
      width: 300,
    },
    {
      key: 'Address',
      title: 'IP地址',
      dataIndex: 'Address',
      width: 300,
    },
    {
      key: 'CreationTime',
      title: '创建时间',
      width: 300,
      dataIndex: 'CreationTime',
      sortable: true,
    },
    {
      key: 'Status',
      title: '状态',
      dataIndex: 'Status',
      width: 300,
    },
  ];
  const search = {
    children: <Button>自定义内容</Button>,
    defaultDataIndex: 'name',
    defaultSelectedDataIndex: 'name',
    onlySupportOne: true,
    options: [
      {
        label: '实例名称',
        dataIndex: 'name',
        template: 'input',
        templateProps: {
          placeholder: '按实例名称搜索',
        },
        defaultValue: 'abc',
      },
      {
        label: '网络类型',
        dataIndex: 'type',
        template: 'select',
        templateProps: {
          placeholder: '请选择网络类型',
          dataSource: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' },
            { label: 'D', value: 'd' },
          ],
        },
        defaultValue: 'c',
      },
      {
        label: '付费类型',
        dataIndex: 'pay',
        template: 'multiple',
        templateProps: {
          placeholder: '请选择付费类型',
          dataSource: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' },
            { label: 'D', value: 'd' },
          ],
        },
        defaultValue: ['a', 'd'],
      },
    ],
  };
  const fetchData = async params => {
    console.log('params', params);
    await sleep(500);
    const res = await axios.get('https://mock.presstime.cn/mock/645db7465bbac3001ab907c8/api/tablelist', {
      params,
    });
    console.log(res);
    return {
      data: res.data.data.Instances.Instance,
      total: res.data.data.TotalCount,
    };
  };
  return (
    <RcTable
      className="cc"
      style={{ color: '#333' }}
      columns={columns}
      fetchData={fetchData}
      refreshIndex={refreshIndex}
      recordCurrent
      showRefreshButton
      operation={
        <Button type="primary" onClick={() => setRefreshIndex(Date.now())}>
          手动刷新
        </Button>
      }
      search={search}
      primaryKey="InstanceId"
      selection={({ selectedRowKeys }: { selectedRowKeys: any[] }) => {
        return (
          <Badge count={selectedRowKeys.length}>
            <Button disabled={selectedRowKeys.length === 0}>Delete</Button>
          </Badge>
        );
      }}
    />
  );
};

export default Demo;
```

## filterSlot

```tsx
import React, { useState } from 'react';
import { RcTable, sleep } from '@xsahxl/ui';
import axios from 'axios';
import { Button, Badge } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';

const Demo = () => {
  const [refreshIndex, setRefreshIndex] = useState(0);
  const columns = [
    {
      key: 'InstanceName',
      title: '实例名称',
      dataIndex: 'InstanceName',
      width: 300,
    },
    {
      key: 'Address',
      title: 'IP地址',
      dataIndex: 'Address',
      width: 300,
    },
    {
      key: 'CreationTime',
      title: '创建时间',
      width: 300,
      dataIndex: 'CreationTime',
      sortable: true,
    },
    {
      key: 'Status',
      title: '状态',
      dataIndex: 'Status',
      width: 300,
    },
  ];
  const search = {
    children: <Button>自定义内容</Button>,
    beforeFilterRender: <Button>beforeFilterRender</Button>,
    afterFilterRender: <Button>afterFilterRender</Button>,
    defaultDataIndex: 'name',
    defaultSelectedDataIndex: 'name',
    onlySupportOne: true,
    options: [
      {
        label: '实例名称',
        dataIndex: 'name',
        template: 'input',
        templateProps: {
          placeholder: '按实例名称搜索',
        },
        defaultValue: 'abc',
      },
      {
        label: '网络类型',
        dataIndex: 'type',
        template: 'select',
        templateProps: {
          placeholder: '请选择网络类型',
          dataSource: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' },
            { label: 'D', value: 'd' },
          ],
        },
        defaultValue: 'c',
      },
      {
        label: '付费类型',
        dataIndex: 'pay',
        template: 'multiple',
        templateProps: {
          placeholder: '请选择付费类型',
          dataSource: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' },
            { label: 'D', value: 'd' },
          ],
        },
        defaultValue: ['a', 'd'],
      },
    ],
  };
  const fetchData = async params => {
    console.log('params', params);
    await sleep(500);
    const res = await axios.get('https://mock.presstime.cn/mock/645db7465bbac3001ab907c8/api/tablelist', {
      params,
    });
    console.log(res);
    return {
      data: res.data.data.Instances.Instance,
      total: res.data.data.TotalCount,
    };
  };
  return (
    <RcTable
      className="cc"
      style={{ color: '#333' }}
      columns={columns}
      fetchData={fetchData}
      refreshIndex={refreshIndex}
      recordCurrent
      showRefreshButton
      operation={
        <Button type="primary" onClick={() => setRefreshIndex(Date.now())}>
          手动刷新
        </Button>
      }
      search={search}
      primaryKey="InstanceId"
      selection={({ selectedRowKeys }: { selectedRowKeys: any[] }) => {
        return (
          <Badge count={selectedRowKeys.length}>
            <Button disabled={selectedRowKeys.length === 0}>Delete</Button>
          </Badge>
        );
      }}
    />
  );
};

export default Demo;
```

## pagination=false

```tsx
import React, { useState } from 'react';
import { RcTable, sleep } from '@xsahxl/ui';
import axios from 'axios';
import { Button, Badge } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';

const Demo = () => {
  const [refreshIndex, setRefreshIndex] = useState(0);
  const columns = [
    {
      key: 'InstanceName',
      title: '实例名称',
      dataIndex: 'InstanceName',
      width: 300,
    },
    {
      key: 'Address',
      title: 'IP地址',
      dataIndex: 'Address',
      width: 300,
    },
    {
      key: 'CreationTime',
      title: '创建时间',
      width: 300,
      dataIndex: 'CreationTime',
      sortable: true,
    },
    {
      key: 'Status',
      title: '状态',
      dataIndex: 'Status',
      width: 300,
    },
  ];
  const search = {
    defaultDataIndex: 'name',
    defaultSelectedDataIndex: 'name',
    onlySupportOne: true,
    options: [
      {
        label: '实例名称',
        dataIndex: 'name',
        template: 'input',
        templateProps: {
          placeholder: '按实例名称搜索',
        },
        defaultValue: 'abc',
      },
      {
        label: '网络类型',
        dataIndex: 'type',
        template: 'select',
        templateProps: {
          placeholder: '请选择网络类型',
          dataSource: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' },
            { label: 'D', value: 'd' },
          ],
        },
        defaultValue: 'c',
      },
      {
        label: '付费类型',
        dataIndex: 'pay',
        template: 'multiple',
        templateProps: {
          placeholder: '请选择付费类型',
          dataSource: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' },
            { label: 'D', value: 'd' },
          ],
        },
        defaultValue: ['a', 'd'],
      },
    ],
  };
  const fetchData = async params => {
    console.log('params', params);
    await sleep(500);
    const res = await axios.get('https://mock.presstime.cn/mock/645db7465bbac3001ab907c8/api/tablelist', {
      params,
    });
    console.log(res);
    return {
      data: res.data.data.Instances.Instance,
      total: res.data.data.TotalCount,
    };
  };
  return (
    <RcTable
      className="cc"
      style={{ color: '#333' }}
      columns={columns}
      fetchData={fetchData}
      refreshIndex={refreshIndex}
      recordCurrent
      showRefreshButton
      operation={
        <Button type="primary" onClick={() => setRefreshIndex(Date.now())}>
          手动刷新
        </Button>
      }
      search={search}
      primaryKey="InstanceId"
      selection={({ selectedRowKeys }: { selectedRowKeys: any[] }) => {
        return (
          <Badge count={selectedRowKeys.length}>
            <Button disabled={selectedRowKeys.length === 0}>Delete</Button>
          </Badge>
        );
      }}
    />
  );
};

export default Demo;
```

## API

> 继承 [@alicloud/console-components-table](https://xconsole.aliyun-inc.com/nexconsole/component_web/wyqgmh#/apis) 组件的 API

| 名称              | 类型                                                         | 说明                                                                                                        | 默认值 |
| ----------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- | ------ |
| fetchData         | (data: [IParams](#iparams)) => Promise<[IResult](#iresult)\> | 请求数据源的方法, 入参信息包含搜索条件和分页信息等                                                          | -      |
| refreshIndex      | number                                                       | 触发刷新操作,重新请求fetchData                                                                              | 0      |
| recordCurrent     | boolean                                                      | 仅 refreshIndex 设置后生效，默认为false， refreshIndex 更新后，当前页会到第一页，设置为true后，停留在当前页 | false  |
| showRefreshButton | boolean                                                      | 是否显示刷新按钮                                                                                            | false  |
| search            | [IRcSearchProps](#ircsearchprops)                            |                                                                                                             | -      |
| columns           | ColumnProps[]                                                | 列描述数据对象，是 columns 中的一项，继承Table.Column的 API                                                 | -      |

### IParams

```
interface IParams {
  current?: number;
  pageSize?: number;
  [key: string]: any;
}
```

### IResult

```
interface IResult {
  data: any[];
  total?: number;
}
```

### IRcSearchProps

> 继承 [@alicloud/console-components-search](https://xconsole.aliyun-inc.com/nexconsole/modules/rc-search#api) 组件的 API

| 名称                     | 类型                    | 说明                                               | 默认值 |
| ------------------------ | ----------------------- | -------------------------------------------------- | ------ |
| options                  | IRcSearchOptionsProps[] | 请求数据源的方法, 入参信息包含搜索条件和分页信息等 | -      |
| placeholder              | string                  | 默认placeholder                                    | -      |
| children                 | ReactNode               | 自定义内容                                         | -      |
| beforeFilterRender       | ReactNode               | filter 之前的 插槽                                 | -      |
| afterFilterRender        | ReactNode               | filter 之后的 插槽                                 | -      |
| onlySupportOne           | boolean                 | 是否仅支持单选                                     | -      |
| defaultDataIndex         | string                  | 默认搜索类别                                       | -      |
| defaultSelectedDataIndex | string                  | 默认选中的类别                                     | -      |

### IRcSearchOptionsProps

| 名称          | 类型   | 说明                                                                                                             | 默认值 |
| ------------- | ------ | ---------------------------------------------------------------------------------------------------------------- | ------ |
| label         | string | 字段展示名称                                                                                                     | -      |
| dataIndex     | string | 字段表单key                                                                                                      | -      |
| defaultValue  | any    | 默认值                                                                                                           | -      |
| template      | string | 字段，交互组件类型（input/select/multiple）<br />- input：搜索框<br />- select：单选<br />- multiple：多选<br /> | -      |
| templateProps | any    | 定义传给表单项的属性 templateProps.placeholder templateProps.dataSource                                          | -      |
| groupName     | string | 分组                                                                                                             | -      |
