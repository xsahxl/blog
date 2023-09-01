import { InternalAxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { isPlainObject } from 'lodash';
import qs from 'qs';
import { IConfig, CONTENT_TYPE } from '../types';
import store from '../store';

const getPostData = (config: IConfig = {}) => {
  if (isPlainObject(config.json)) {
    store.setRequestData({ params: config.params, data: config.json });
    return {
      data: JSON.stringify(config.json),
      headers: {
        'Content-Type': CONTENT_TYPE.json,
      } as AxiosRequestHeaders,
    };
  }
  if (isPlainObject(config.form)) {
    store.setRequestData({ params: config.params, data: config.form });
    return {
      data: qs.stringify(config.form),
      headers: {
        'Content-Type': CONTENT_TYPE.form as string,
      } as AxiosRequestHeaders,
    };
  }
};

export default (config: InternalAxiosRequestConfig) => {
  if (config.method === 'get') {
    store.setRequestData({ params: config.params });
    return {
      ...config,
      paramsSerializer: (p: Record<string, any>) => qs.stringify(p, { indices: false }),
    };
  }
  return { ...config, ...getPostData(config) };
};
