import { AxiosResponse } from 'axios';
import ResponseStatusError from '../http-errors/ResponseStatusError';

export default (response: AxiosResponse) => {
  const { status } = response;
  if (status >= 200 && status < 300) {
    return response;
  }
  throw new ResponseStatusError(response);
};
