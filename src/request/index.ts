import axios, { CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { includes, isEmpty, isFunction, isPlainObject, merge, toLower } from 'lodash';
import qs from 'qs';
import errorDialog from './error-dialog';
import validStatus from './interceptors/valid-status';
import validData from './interceptors/valid-data';
import extractData from './interceptors/extract-data';
import { IInterceptors, IConfig, CONTENT_TYPE, AXIOS_INSTANCE_REF } from './types';
import { ResponseDataCodeError } from './http-errors';



const createDefaultAxiosInstance = (options: CreateAxiosDefaults, interceptors: IInterceptors = {}) => {
  const config = merge(
    {
      withCredentials: true,
    },
    options,
  );
  const instance = axios.create(config);
  const { request, response } = interceptors;
  isFunction(request) && instance.interceptors.request.use(request);
  instance.interceptors.response.use(validStatus);
  instance.interceptors.response.use(validData);
  instance.interceptors.response.use(extractData);
  isFunction(response) && instance.interceptors.response.use(response);
  return instance;
};

const axiosService = (options: AxiosRequestConfig = {}, interceptors: IInterceptors = {}) => async (config: IConfig = {}) => {
  const newOption = { ...options };
  // 处理默认值
  newOption.method = toLower(newOption.method) || 'get';
  newOption.baseURL = newOption.baseURL || interceptors.baseURL
  const { ignoreError, customError } = config;
  // 缓存 axios 实例
  if (!(axiosService as any)[AXIOS_INSTANCE_REF]) {
    (axiosService as any)[AXIOS_INSTANCE_REF] = createDefaultAxiosInstance(newOption, interceptors);
  }

  const instance = (axiosService as any)[AXIOS_INSTANCE_REF]
  const newParams = getParams(newOption, config)
  const serviceConfig = { ...newOption, ...newParams };
  try {
    return await instance.request(serviceConfig);
  } catch (err) {
    console.error(`request error: ${err}`);
    if (!ignoreError) {
      const callback = () => {
        errorDialog(err as ResponseDataCodeError, serviceConfig);
        throw err;
      };
      if (isFunction(customError)) {
        return customError(err as Error, serviceConfig, callback);
      }
      return callback();
    }
  }
};

const getParams = (options: AxiosRequestConfig, config: IConfig) => {
  const { url } = options;
  const { params = {} } = config;
  if (options.method === 'get') {
    return {
      params,
      paramsSerializer: (p: Record<string, any>) => qs.stringify(p, { indices: false }),
    };
  }
  const newUrl = isEmpty(params) ? url : `${url}${includes(url, '?') ? '&' : '?'}${qs.stringify(params)}`;
  return { url: newUrl, ...getPostData(config) };
}

const getPostData = (config: IConfig = {}) => {
  if (isPlainObject(config.json)) return {
    data: JSON.stringify(config.json),
    headers: {
      'Content-Type': CONTENT_TYPE.json,
    }
  };
  if (isPlainObject(config.form)) return {
    data: qs.stringify(config.form),
    headers: {
      'Content-Type': CONTENT_TYPE.form,
    }
  };
}

export const createRequest = (interceptors: IInterceptors = {}) => (options: AxiosRequestConfig) => axiosService(options, interceptors);
export default axiosService;
