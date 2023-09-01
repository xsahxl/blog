import { AxiosResponse } from 'axios';
import ResponseError from './ResponseError';
const format = require('format');

const ERR_MSG = 'Invalid response status code: %d';

class ResponseStatusError extends ResponseError {
  constructor(response: AxiosResponse, message: string = ERR_MSG) {
    const { status } = response;
    super(response, format(message, status));
    this.status = status;
  }
}

export default ResponseStatusError;
