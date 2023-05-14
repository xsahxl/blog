import { Icon } from '@alicloud/console-components';
import { isEmpty } from 'lodash';
import React, { FC, useState } from 'react';
import Copy from '../../../copy';
import i18n from '../../../i18n';
import { ResponseDataCodeError } from '../../http-errors';
import { axiosDataIntercept } from './utils';

type Props = {
  error: ResponseDataCodeError;
  config: Record<string, any>;
};

const Content: FC<Props> = ({ error, config = {} }) => {
  const [isShow, setIsShow] = useState(false);
  const errorInfo = axiosDataIntercept(error, config);
  const renderDetail = () => {
    if (!isShow) return null;
    const {
      url,
      method,
      params,
      requestData,
      responseData,
      traceId,
      requestId,
      headers,
    } = errorInfo;
    return (
      <>
        {url && <div>url: {url}</div>}
        {method && <div>method: {method}</div>}
        {headers && <div>headers: {JSON.stringify(headers)}</div>}
        {params && <div>params: {JSON.stringify(params)}</div>}
        {traceId && <div>traceId: {traceId}</div>}
        {requestId && <div>requestId: {requestId}</div>}
        {requestData && <div>requestData: {JSON.stringify(requestData)}</div>}
        {responseData && (
          <div>responseData: {JSON.stringify(responseData)}</div>
        )}
      </>
    );
  };
  const renderContent = () => {
    if (isEmpty(errorInfo.code)) return null;
    return (
      <>
        <div
          className="cursor-pointer align-center"
          onClick={() => setIsShow(!isShow)}
        >
          <Copy
            text={JSON.stringify(errorInfo)}
            showIcon
            icon={
              <>
                <span>{i18n('ui.copy.one_click')}</span>
                <Icon className="ml-4" type="copy" size="xs" />
              </>
            }
          >
            {i18n('ui.error.detail', { code: errorInfo.code })}
          </Copy>
          <Icon
            className="ml-8 cursor-pointer"
            size="xs"
            type="arrow-down"
            style={{
              transform: isShow ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
              color: '#999',
            }}
          />
        </div>
        {renderDetail()}
      </>
    );
  };

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: errorInfo.message }} />
      {renderContent()}
    </>
  );
};

export default Content;
