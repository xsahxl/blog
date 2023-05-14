import { AxiosResponse } from 'axios';

import ExtendableError from './ExtendableError';

const ERR_MSG = 'Response error';

class ResponseError extends ExtendableError {
  constructor(response: AxiosResponse, message: string = ERR_MSG) {
    super(message);
    this.response = response;
  }
}

export default ResponseError;
