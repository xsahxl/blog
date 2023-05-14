import ResponseDataCodeError from './ResponseDataCodeError';
import { AxiosResponse } from 'axios';

const ERR_MSG = 'Two-factor authentication';

class ResponseRiskError extends ResponseDataCodeError {
  constructor(response: AxiosResponse, message = ERR_MSG) {
    super(response, message);
  }
}

export default ResponseRiskError;
