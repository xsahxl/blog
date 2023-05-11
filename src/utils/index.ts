import React from 'react';
import _ from 'lodash';
import Cookies from 'js-cookie';
import { get } from 'lodash';


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
  const vscodeLanguage = get(window, 'SERVERLESS_DEVS_CONFIG.lang');
  if (vscodeLanguage) {
    language = vscodeLanguage;
  }
  return language;
}


export const noop: () => Promise<any> = async () => { };

export const useCompare = (value: any) => {
  const ref = React.useRef(value);
  if (!_.isEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
};

export const isEmpty = (arg: any) => {
  // 为空
  if (_.isString(arg) || _.isNumber(arg) || _.isBoolean(arg))
    return arg === undefined || arg === null || arg === ''; // 如果是简单对象
  if (arg instanceof Date) return _.isNaN(+arg); // 如果是Date 则看看能不能转化成数字。
  // 检查 value 是否为一个空对象，集合，映射或者set。 判断的依据是除非是有枚举属性的对象，length 大于 0 的 arguments object, array, string 或类jquery选择器。
  if (_.isArray(arg) || _.isObject(arg)) return _.isEmpty(arg);
  return true;
};

export const isNoneEmpty = (...args: any) => {
  return _.every(args, item => !isEmpty(item));
};


export const sleep = (ms: number = 0) => new Promise((resolve) => setTimeout(resolve, ms));

export const tryfun = async (fn: (...args: any[]) => Promise<any>, ...args: any[]) => {
  try {
    const res = await fn(...args);
    return [null, res]
  } catch (ex) {
    return [ex, null]
  }
};
