import { Button, Icon, Message } from '@alicloud/console-components';
import copy from 'copy-to-clipboard';
import React, { FC, PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';
import i18n from '../i18n';

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

type Props = PropsWithChildren & {
  text: string;
  showIcon: boolean;
  iconSize: IconSize;
  icon: ReactNode;
};

const CopyContent: FC<Props> = (props) => {
  const { children, text, icon, iconSize } = props;
  const onCopy = () => {
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

export default CopyContent;
