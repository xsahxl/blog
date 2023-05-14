import { Button, Icon, Message } from '@alicloud/console-components';
import copy from 'copy-to-clipboard';
import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';
import i18n from '../i18n';
import { CommonProps } from '../types';

type IconSize =
  | number
  | 'xxs'
  | 'xs'
  | 'small'
  | 'medium'
  | 'large'
  | 'xl'
  | 'xxl'
  | 'xxxl'
  | 'inherit';

type Props = PropsWithChildren &
  CommonProps & {
    text: string;
    showIcon?: boolean;
    iconSize?: IconSize;
    icon?: React.ReactNode;
  };

const Copy: FC<Props> = (props) => {
  const { children, text, icon, iconSize } = props;
  const onCopy = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      copy(text);
      Message.success(i18n('ui.common.copy_successed'));
    } catch (error) {
      Message.error(i18n('ui.common.copy_failed'));
    }
  };
  return (
    <SWrapper {...props}>
      {children}
      <Button className="icon" onClick={onCopy} text type="primary">
        {icon ? icon : <Icon className="ml-4" type="copy" size={iconSize} />}
      </Button>
    </SWrapper>
  );
};

const SWrapper = styled.span`
  display: flex;
  align-items: center;
  .icon {
    margin-left: 4px;
    visibility: ${(props: Props) => (props.showIcon ? 'inherit' : 'hidden')};
  }
  &:hover {
    .icon {
      visibility: inherit;
    }
  }
`;

export default Copy;
