import React, { FC, useState, PropsWithChildren } from 'react';
import { Input, Field, Dialog, Icon } from '@alicloud/console-components';
import { DialogProps } from '@alicloud/console-components/types/dialog';
import { replace, isString } from 'lodash';
import { noop, tryfun } from '../utils';
import i18n from '../i18n';

type Props = PropsWithChildren &
  DialogProps & {
    disabled?: boolean;
    title?: React.ReactNode;
    message: string | React.ReactNode;
    confirmKey: string;
    confirmPlaceholer?: string;
    riskInfo?: React.ReactNode;
    onConfirm: () => Promise<any>;
    onCancel?: () => void;
  };

const RiskConfirm: FC<Props> = props => {
  const {
    children,
    title = i18n('ui.common.tips'),
    message,
    confirmKey,
    confirmPlaceholer = i18n('ui.common.input.placeholder'),
    riskInfo,
    onConfirm = noop,
    onCancel = noop,
    disabled = false,
    ...rest
  } = props;

  const [visile, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const field = Field.useField();
  const { init, getValue } = field;
  const _title = (
    <div>
      <Icon type="warning" style={{ color: '#ffc440', verticalAlign: 'middle' }} />
      <span style={{ color: '#333', fontSize: 18, verticalAlign: 'middle', marginLeft: 8 }} dangerouslySetInnerHTML={{ __html: title }} />
    </div>
  );

  const handleOk = async () => {
    setLoading(true);
    const [err] = await tryfun(onConfirm);
    if (!err) setVisible(false);
    setLoading(false);
  };
  const handleCancel = () => {
    setVisible(false);
    onCancel();
  };
  const handleOpen = (e: any) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    setVisible(true);
  };
  return (
    <>
      <div className="display-inline" onClick={handleOpen}>
        {children}
      </div>
      <Dialog
        isFullScreen
        shouldUpdatePosition
        onClose={handleCancel}
        onCancel={handleCancel}
        onOk={handleOk}
        title={_title}
        visible={visile}
        style={{ width: 640 }}
        okProps={{ disabled: getValue('key') !== confirmKey, loading }}
        {...rest}
      >
        {isString(message) ? (
          <div
            dangerouslySetInnerHTML={{
              __html: replace(message, confirmKey, `<span style="color: #d93026">${confirmKey}</span>`),
            }}
          />
        ) : (
          message
        )}
        <div className="mt-16">
          <Input {...init('key')} style={{ width: '100%' }} placeholder={confirmPlaceholer} />
        </div>
        {riskInfo}
      </Dialog>
    </>
  );
};

export default RiskConfirm;
