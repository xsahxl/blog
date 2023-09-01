import { InternalAxiosRequestConfig, AxiosInterceptorManager, AxiosResponse } from 'axios';

export const AXIOS_INSTANCE_REF = Symbol('AXIOS_INSTANCE_REF');

export const DEFAULT_METHOD = 'get';

export enum CONTENT_TYPE {
  json = 'application/json;charset=UTF-8',
  form = 'application/x-www-form-urlencoded;charset=UTF-8',
}

export interface IInterceptors {
  request?: AxiosInterceptorManager<InternalAxiosRequestConfig>;
  response?: AxiosInterceptorManager<AxiosResponse>;
  baseURL?: string;
}

export interface IConfig {
  params?: Record<string, any>; // get 请求参数
  json?: Record<string, any>; // post 请求参数，，application/json
  form?: Record<string, any>; // post 请求参数，application/x-www-form-urlencoded
  ignoreError?: boolean; // 是否忽略错误
  customError?: (err: Error, data: Record<string, any>, callback: () => void) => void; // 自定义错误处理
}
