import { concat, each, includes, isEmpty, isString, uniqBy, flatten, map, find } from 'lodash';
import { offlines, real_times } from './constant';
import { IModeValue, IQucikTimes, ITime, ITimeChild } from './types';
import moment from 'moment';

export const getQucikTimes = (mode: IModeValue, quickTimes: IQucikTimes[]) => {
  const option = uniqBy(concat(real_times, offlines), 'key');
  if (isEmpty(quickTimes)) {
    const data = mode === 'realTime' ? real_times : offlines;
    return data as ITime[];
  } else {
    const data: ITime[] = [];
    each(quickTimes, (item: IQucikTimes) => {
      each(option, obj => {
        if (item.key === obj.key) {
          const childs: ITimeChild[] = [];
          each(obj.childs, childsObj => {
            includes(item.childs, childsObj.key) && childs.push(childsObj);
          });
          isEmpty(item.childs)
            ? data.push(obj)
            : data.push({
                ...obj,
                childs,
              });
        }
      });
    });
    return data;
  }
};

export const transform = (value: string | number[] | moment.Moment[], data: ITime[]) => {
  if (isString(value)) {
    const newChilds = flatten(map(data, item => item.childs));
    const findObj = find(newChilds, item => item.key === value);
    return findObj
      ? {
          ...findObj,
          momentValue: map(findObj.getValue(), obj => moment(obj)),
        }
      : {};
  } else if (Array.isArray(value)) {
    let [start, end] = value;
    start = moment.isMoment(start) ? start : moment(start);
    end = moment.isMoment(end) ? end : moment(end);
    return {
      key: 'custom',
      label: `${start.format('YYYY-MM-DD HH:mm:ss')} - ${end.format('YYYY-MM-DD HH:mm:ss')}`,
      momentValue: [start, end],
      getValue: () => [start.valueOf(), end.valueOf()],
    };
  }
  return {};
};
