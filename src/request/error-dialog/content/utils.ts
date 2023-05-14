import { ResponseDataCodeError } from '../../http-errors';
import { startsWith } from 'lodash';

export const axiosDataIntercept = (error: ResponseDataCodeError, config: Record<string, any>) => {
  const { code, data: responseData = {}, message, traceId, requestId } = error;
  const { data = {}, method, baseURL, url, params = {}, headers } = config;
  return {
    url: getUrl(url, baseURL),
    message,
    method,
    params,
    requestData: data,
    responseData,
    traceId,
    requestId,
    code,
    headers,
  };
};

const getUrl = (url: string, baseURL: string) => {
  if (isAbsolute(url)) return url;
  if (isAbsolute(baseURL)) return `${baseURL}${url}`;
  return `${window.location.origin}${baseURL}${url}`;
}

const isAbsolute = (url: string) => startsWith(url, 'http://') || startsWith(url, 'https://');
