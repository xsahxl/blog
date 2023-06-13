---
toc: content
---

# request

- 请求失败时，支持报错弹窗提示报错信息（只弹一次）
- ignoreError 字段可忽略弹窗错误
- customError 可自定义错误
- get 请求通过 params 传递参数，
- post 请求，对于 json 数据可通过 json 参数传递，form-data 数据可通过 form 参数传递
- baseURL(统一设置 baseURL)
- request(统一设置公共参数)
- response(统一处理接口的公共业务逻辑)

> 内部集成了 [ahooks](https://ahooks.gitee.io)

## 何时使用

请求接口时

## 基本使用

```tsx
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import { request } from '@xsahxl/ui';
import { useState } from 'react';

// 项目里可以新建一个services目录，统一管理接口
const listtags = request({
  url: 'https://mock.presstime.cn/mock/645db7465bbac3001ab907c8/api/listtags',
});

const getstatus = request({
  url: 'https://mock.presstime.cn/mock/645db7465bbac3001ab907c8/api/status',
});

const Demo = () => {
  const [data, setData] = useState();
  const fetchData = async () => {
    const res = await listtags();
    setData(res.data);
  };
  return (
    <>
      <div>
        <Button onClick={fetchData}>简单使用</Button>
        <Button
          className="ml-8"
          onClick={() => getstatus({ params: { code: '401' } })}
        >
          401
        </Button>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default Demo;
```

## get with params

```tsx
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import { request } from '@xsahxl/ui';
import { useState } from 'react';

// 项目里可以新建一个services目录，统一管理接口
const service = request({
  url: 'https://mock.presstime.cn/mock/645db7465bbac3001ab907c8/api/get',
});

const Demo = () => {
  const [data, setData] = useState();
  const fetchData = async () => {
    const res = await service({ params: { name: 'xiaoming' } });
    setData(res);
  };
  return (
    <>
      <Button onClick={fetchData}>get with params</Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default Demo;
```

## post with json

```tsx
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import { request } from '@xsahxl/ui';
import { useState } from 'react';

// 项目里可以新建一个services目录，统一管理接口
const service = request({
  url: 'https://mock.presstime.cn/mock/645db7465bbac3001ab907c8/api/post',
  method: 'post',
});

const Demo = () => {
  const [data, setData] = useState();
  const fetchData = async () => {
    const res = await service({ json: { name: 'xiaoming' } });
    setData(res);
  };
  return (
    <>
      <Button onClick={fetchData}>post with json</Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default Demo;
```

## post with form-data

```tsx
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import { request } from '@xsahxl/ui';
import { useState } from 'react';

// 项目里可以新建一个services目录，统一管理接口
const service = request({
  url: 'https://mock.presstime.cn/mock/645db7465bbac3001ab907c8/api/post',
  method: 'post',
});

const Demo = () => {
  const [data, setData] = useState();
  const fetchData = async () => {
    const res = await service({ form: { name: 'xiaoming' } });
    setData(res);
  };
  return (
    <>
      <Button onClick={fetchData}>post with form-data</Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default Demo;
```

## 接口异常

```tsx
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import { request } from '@xsahxl/ui';

// 项目里可以新建一个services目录，统一管理接口
const service = request({
  url: 'https://mock.presstime.cn/mock/645db7465bbac3001ab907c8/api/status',
});

const Demo = () => {
  const fetchData = async ({ code }) => {
    await service({ params: { code } });
  };
  return (
    <>
      <Button onClick={() => fetchData({ code: 'NeedLogin' })}>登录过期</Button>
      <Button
        className="ml-8"
        onClick={() => fetchData({ code: 'PostonlyOrTokenError' })}
      >
        请求过期
      </Button>
      <Button className="ml-8" onClick={() => fetchData({ code: '401' })}>
        401
      </Button>
    </>
  );
};

export default Demo;
```

## 多个接口报错的时候只弹窗报错提示一次

```tsx
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import { request } from '@xsahxl/ui';
import { useState } from 'react';

// 项目里可以新建一个services目录，统一管理接口
const service = request({
  url: 'https://mock.presstime.cn/mock/645db7465bbac3001ab907c8/api/post',
});

const Demo = () => {
  const [data, setData] = useState();
  const fetchData = async () => {
    const res = await service({
      form: { name: 'xiaoming' },
    });
    setData(res);
  };
  return (
    <>
      <Button onClick={() => Promise.all([fetchData(), fetchData()])}>
        多接口报错
      </Button>
    </>
  );
};

export default Demo;
```

## ignoreError

```tsx
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import { request } from '@xsahxl/ui';
import { useState } from 'react';

// 项目里可以新建一个services目录，统一管理接口
const service = request({
  url: 'https://mock.presstime.cn/mock/645db7465bbac3001ab907c8/api/post',
});

const Demo = () => {
  const [data, setData] = useState();
  const fetchData = async () => {
    const res = await service({
      form: { name: 'xiaoming' },
      ignoreError: true,
    });
    setData(res);
  };
  return (
    <>
      <Button onClick={fetchData}>ignore error</Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default Demo;
```

## customError

```tsx
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import { request } from '@xsahxl/ui';
import { useState } from 'react';

// 项目里可以新建一个services目录，统一管理接口
const service = request({
  url: 'https://mock.presstime.cn/mock/645db7465bbac3001ab907c8/api/post',
});

const Demo = () => {
  const [data, setData] = useState();
  const fetchData = async () => {
    const res = await service({
      form: { name: 'xiaoming' },
      customError: (err, config, callback) => {
        console.log('err', err);
        console.log('config', config);
        // 处理自己的逻辑
      },
    });
    setData(res);
  };
  const fetchDataWithCallback = async () => {
    const res = await service({
      form: { name: 'xiaoming' },
      customError: (err, config, callback) => {
        console.log('err', err);
        console.log('config', config);
        // 处理自己的逻辑
        // 执行 callback 会显示报错弹窗
        callback();
      },
    });
    setData(res);
  };
  return (
    <>
      <Button onClick={fetchData}>custom error</Button>
      <Button className="ml-8" onClick={fetchDataWithCallback}>
        custom error with callback
      </Button>
    </>
  );
};

export default Demo;
```

## createRequest

### baseURL(统一设置 baseURL)

```tsx
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import { createRequest } from '@xsahxl/ui';
import _ from 'lodash';
import { useState } from 'react';

// 创建request实例
const request = createRequest({
  baseURL: 'https://mock.presstime.cn/mock/645db7465bbac3001ab907c8',
  request: (config) => {
    console.log('request', config);
    // 添加公共的参数
    _.set(config, 'params.region', 'cn-chengdu');
    return config;
  },
  response: (config) => {
    console.log('response', config);
    return config;
  },
});

// 项目里可以新建一个services目录，统一管理接口
const service = request({
  url: '/api/get',
});

const Demo = () => {
  const [data, setData] = useState();
  const fetchData = async () => {
    const res = await service({ params: { name: 'xiaoming' } });
    setData(res);
  };
  return (
    <>
      <Button onClick={fetchData}>测试</Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default Demo;
```

### request(统一设置公共参数)

```tsx
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import { createRequest } from '@xsahxl/ui';
import _ from 'lodash';
import { useState } from 'react';

// 创建request实例
const request = createRequest({
  baseURL: 'https://mock.presstime.cn/mock/645db7465bbac3001ab907c8',
  request: (config) => {
    console.log('request', config);
    // 添加公共的参数
    _.set(config, 'params.region', 'cn-chengdu');
    return config;
  },
  response: (config) => {
    console.log('response', config);
    return config;
  },
});

// 项目里可以新建一个services目录，统一管理接口
const service = request({
  url: '/api/post',
  method: 'post',
});
const serviceWithGet = request({
  url: '/api/post',
});

const Demo = () => {
  const [data, setData] = useState();
  const fetchData = async () => {
    const res = await service({
      json: { name: 'xiaoming' },
    });
    setData(res);
  };
  const fetchDataError = async () => {
    const res = await serviceWithGet({
      json: { name: 'xiaoming' },
    });
    setData(res);
  };
  return (
    <>
      <Button onClick={fetchData}>成功</Button>
      <Button className="ml-8" onClick={fetchDataError}>
        失败
      </Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default Demo;
```

### response(统一处理接口的公共业务逻辑)

```tsx
import { Button } from '@alicloud/console-components';
import '@alicloud/console-components/dist/wind.css';
import { createRequest } from '@xsahxl/ui';
import _ from 'lodash';
import { useState } from 'react';

// 创建request实例
const request = createRequest({
  baseURL: 'https://mock.presstime.cn/mock/645db7465bbac3001ab907c8',
  request: (config) => {
    console.log('request', config);
    // 添加公共的参数
    _.set(config, 'params.region', 'cn-chengdu');
    return config;
  },
  response: (config) => {
    console.log('response', config);
    // 可以处理项目的业务逻辑
    if (_.get(config, 'data.code') === 'PurchaseNotFound') {
      window.location.href = 'http://shihuali.oss.devsapp.net';
      return config;
    }
    return config;
  },
});

// 项目里可以新建一个services目录，统一管理接口
const service = request({
  url: '/api/status',
});

const Demo = () => {
  const [data, setData] = useState();
  const fetchData = async () => {
    const res = await service({
      params: { code: 'PurchaseNotFound' },
    });
    setData(res);
  };
  return (
    <>
      <Button onClick={fetchData}>测试</Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default Demo;
```

## API

### request(options)(config)

- options

| 属性      | 说明                                                              | 类型               | 默认值 |
| --------- | ----------------------------------------------------------------- | ------------------ | ------ |
| ...config | 继承 [Axios](https://www.axios-http.cn/docs/req_config) 的配置    | AxiosRequestConfig |        |
| url       | `url` is the server URL that will be used for the request         | string             | -      |
| method    | `method` is the request method to be used when making the request | string             | get    |

- config

| 属性        | 说明                     | 类型                                                                | 默认值 |
| ----------- | ------------------------ | ------------------------------------------------------------------- | ------ |
| params      | get 请求                 | Record<string, any>                                                 | -      |
| json        | post with json 请求      | Record<string, any>                                                 | -      |
| form        | post with form-data 请求 | Record<string, any>                                                 | -      |
| ignoreError | 是否忽略报错的弹窗       | boolean                                                             | -      |
| customError | 自定义报错信息           | (error: Error, data:Record<string, any> , callback: ()=>void)=>void | -      |

### createRequest(interceptors), 对请求可以做一些自定义的拦截处理

- interceptors

| 属性     | 说明                                                           | 类型                                                 | 默认值 |
| -------- | -------------------------------------------------------------- | ---------------------------------------------------- | ------ |
| request  | 接口请求之前的拦截处理                                         | AxiosInterceptorManager<InternalAxiosRequestConfig\> | -      |
| response | 接口返回之后的拦截处理                                         | AxiosInterceptorManager<AxiosResponse\>              | -      |
| baseURL  | `baseURL` will be prepended to `url` unless `url` is absolute. | string                                               | -      |
