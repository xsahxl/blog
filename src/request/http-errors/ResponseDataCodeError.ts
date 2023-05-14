import { AxiosResponse } from 'axios';
import ResponseError from './ResponseError';
const format = require('format');

const ERR_MSG = "Invalid response data's code: %s";

class ResponseDataCodeError extends ResponseError {
  public data: any;
  public traceId: string;
  public requestId: string;
  constructor(response: AxiosResponse, message: string = ERR_MSG) {
    const { data: { code, data, message: responseMessage, traceId, requestId } = {} } = response;
    super(response, format(message, code));
    this.code = code;
    this.data = data;
    this.message = responseMessage;
    this.traceId = traceId;
    this.requestId = requestId;
  }
}

export default ResponseDataCodeError;
