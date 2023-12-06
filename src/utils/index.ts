import Cookies from 'js-cookie';
import _, { get } from 'lodash';
import React from 'react';

export function getLanguage() {
  let language = Cookies.get('xsahxl_lang') || Cookies.get('aliyun_lang') || Cookies.get('inner_oneconsole_lang') || 'zh';
  // 兼容取值 zh-TW 的case
  if (language.startsWith('zh')) {
    language = 'zh';
  }
  if (language.startsWith('en')) {
    language = 'en';
  }
  if (language.startsWith('ja')) {
    language = 'ja';
  }
  const vscodeLanguage = get(window, 'XSAHXL_CONFIG.lang');
  if (vscodeLanguage) {
    language = vscodeLanguage;
  }
  return language;
}

export const noop: () => Promise<any> = async () => {};

export const useCompare = (value: any) => {
  const ref = React.useRef(value);
  if (!_.isEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
};

export const isEmpty = (arg: any) => {
  // 为空
  if (_.isString(arg) || _.isNumber(arg) || _.isBoolean(arg)) return arg === undefined || arg === null || arg === ''; // 如果是简单对象
  if (arg instanceof Date) return _.isNaN(+arg); // 如果是Date 则看看能不能转化成数字。
  // 检查 value 是否为一个空对象，集合，映射或者set。 判断的依据是除非是有枚举属性的对象，length 大于 0 的 arguments object, array, string 或类jquery选择器。
  if (_.isArray(arg) || _.isObject(arg)) return _.isEmpty(arg);
  return true;
};

export const isNoneEmpty = (...args: any) => {
  return _.every(args, item => !isEmpty(item));
};

export const sleep = (ms: number = 0) => new Promise(resolve => setTimeout(resolve, ms));

export const tryfun = async (fn: (...args: any[]) => Promise<any>, ...args: any[]) => {
  try {
    const res = await fn(...args);
    return [null, res];
  } catch (ex) {
    return [ex, null];
  }
};

interface ScrollToOptions {
  left?: number;
  top?: number;
  behavior?: 'auto' | 'smooth';
}
export const scrollTo = (data: ScrollToOptions) => {
  // 如果页面支持 window.scrollTo 方法（大多数现代浏览器都支持），使用该方法滚动到顶部
  if (window.scrollTo) return window.scrollTo(data);
  // 如果不支持 window.scrollTo 方法，尝试使用 document.documentElement.scrollTop 或 document.body.scrollTop
  if (document.documentElement.scrollTop) return document.documentElement.scrollTo(data);
  return document.body.scrollTo(data);
};
