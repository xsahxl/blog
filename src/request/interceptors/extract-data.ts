import { AxiosResponse } from 'axios';
import { isPlainObject, get } from 'lodash';

export const ORIGIN_RESPONSE = Symbol('ORIGIN_RESPONSE');

export default (response: AxiosResponse) => {
  const { data } = get(response, 'data', {});
  const newResponse = isPlainObject(data) ? data : get(response, 'data');
  return {
    ...newResponse,
    [ORIGIN_RESPONSE]: response,
  };
};
