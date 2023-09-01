import axios, { CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { isFunction, toLower } from 'lodash';
import errorDialog from './error-dialog';
import validStatus from './interceptors/valid-status';
import validData from './interceptors/valid-data';
import extractData from './interceptors/extract-data';
import transformData from './interceptors/transform-data';
import { IInterceptors, IConfig, AXIOS_INSTANCE_REF, DEFAULT_METHOD } from './types';
import { ResponseDataCodeError } from './http-errors';
import store from './store';

const createDefaultAxiosInstance = (options: CreateAxiosDefaults, interceptors: IInterceptors = {}) => {
  const instance = axios.create({ withCredentials: true, ...options });
  const { request, response } = interceptors;
  // request interceptor 先添加后执行
  instance.interceptors.request.use(transformData);
  isFunction(request) && instance.interceptors.request.use(request);

  isFunction(response) && instance.interceptors.response.use(response);
  instance.interceptors.response.use(validStatus);
  instance.interceptors.response.use(validData);
  instance.interceptors.response.use(extractData);
  return instance;
};

const axiosService =
  (options: AxiosRequestConfig = {}, interceptors: IInterceptors = {}) =>
  async (config: IConfig = {}) => {
    const newOption = { ...options };
    // 处理默认值
    newOption.method = toLower(newOption.method) || DEFAULT_METHOD;
    newOption.baseURL = newOption.baseURL || interceptors.baseURL;
    const { ignoreError, customError } = config;
    // 缓存 axios 实例
    if (!(axiosService as any)[AXIOS_INSTANCE_REF]) {
      (axiosService as any)[AXIOS_INSTANCE_REF] = createDefaultAxiosInstance(newOption, interceptors);
    }

    const instance = (axiosService as any)[AXIOS_INSTANCE_REF];
    const serviceConfig = { ...newOption, ...config };

    try {
      return await instance.request(serviceConfig);
    } catch (err) {
      console.error(`request error: ${err}`);
      if (!ignoreError) {
        const errorConfig = { ...serviceConfig, ...store.getRequestData() };
        const callback = () => {
          errorDialog(err as ResponseDataCodeError, errorConfig);
          throw err;
        };
        if (isFunction(customError)) {
          return customError(err as Error, errorConfig, callback);
        }
        return callback();
      }
    }
  };

export const createRequest =
  (interceptors: IInterceptors = {}) =>
  (options: AxiosRequestConfig) =>
    axiosService(options, interceptors);
export default axiosService;
