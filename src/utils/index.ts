import React from 'react';
import _ from 'lodash';

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


export const sleep = (ms: number = 0) => new Promise((resolve) => setTimeout(resolve, ms));
