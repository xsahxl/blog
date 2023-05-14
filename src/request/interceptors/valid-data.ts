import { AxiosResponse } from 'axios';
import { ResponseError, ResponseDataCodeError, ResponseRiskError } from '../http-errors';
import { isEmpty } from 'lodash';

export default (response: AxiosResponse) => {
  const { data } = response;
  if (isEmpty(data)) {
    throw new ResponseError(response);
  }
  const { code, message } = data;

  if (code === 'FoundRiskAndDoubleConfirm') {
    throw new ResponseRiskError(response, message);
  }

  if (Number(code) !== 200) {
    throw new ResponseDataCodeError(response, message);
  }
  return response;
};
