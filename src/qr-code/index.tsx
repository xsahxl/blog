import React, { FC, useState } from 'react';
import { Icon } from '@alicloud/console-components';
import BalloonContainer from '../balloon-container';
import QRCodeReact from 'qrcode.react';
import { noop, tryfun } from '../utils';
import styled from 'styled-components';
import { CommonProps } from '../types';

type Props = CommonProps & {
  value: string;
  onRefresh?: () => Promise<any>;
  expired?: boolean;
  trigger?: React.ReactNode;
  logo?: string;
}

const QRCode: FC<Props> = props => {
  const { onRefresh = noop, trigger, logo, value, ...rest } = props;
  const [loading, setLoading] = useState(false);

  const handleRefresh = async (e: any) => {
    e.preventDefault();
    e.stopPropagation()
    setLoading(true);
    await tryfun(onRefresh);
    setLoading(false);
  };
  const Pure = () => (
    <SInner {...props}>
      <QRCodeReact value={value} imageSettings={logo ? { src: logo, height: 24, width: 24, excavate: true } : undefined} {...rest} />
      <div className="qr-code__container" onClick={handleRefresh}>
        <div>
          <Icon type={loading ? 'loading' : "refresh"} />
          <div>点击刷新</div>
        </div>
      </div>
    </SInner>
  );

  if (trigger) {
    return (
      <BalloonContainer trigger={trigger} popupStyle={{ minWidth: 'unset' }} triggerType="hover">
        <Pure />
      </BalloonContainer>
    )
  }

  return <Pure />
};

const SInner = styled.div`
  display: inline-block;
  position: relative;
  & > .qr-code__container {
    display: ${(props: Props) => (props.expired ? 'flex' : 'none')};
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: 0.94;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

export default QRCode;
