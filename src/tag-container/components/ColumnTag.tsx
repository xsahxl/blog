import React, { FC } from 'react';
import { Icon, Balloon, Button } from '@alicloud/console-components';
import { isEmpty } from '../../utils';
import i18n from '../../i18n';
import { map } from 'lodash';
import styled from 'styled-components';

type Props = {
  dataSource: { key: string, value: string }[];
  onClick: () => void;
}
const ColumnTags: FC<Props> = props => {
  const { dataSource = [], onClick } = props;
  const render = () => {
    if (dataSource.length === 0) {
      return (
        <>
          <span>{i18n('ui.no_label_set')}</span>
          <Button className='ml-8' type="primary" text onClick={onClick}>
            {i18n('ui.common.add')}
          </Button></>
      )
    }
    return (
      <div className='align-center'>
        <div className='pt-8'>
          {
            map(dataSource, item => {
              return (
                <div
                  style={{
                    display: 'inline-block',
                    marginBottom: 8,
                    marginRight: 8,
                    border: '1px solid #DEDEDE',
                    padding: '4px 16px',
                    borderRadius: 12,
                    backgroundColor: '#FAFAFA',
                  }}
                  key={item.key}
                >
                  {isEmpty(item.value) ? item.key : `${item.key}:${item.value}`}
                </div>
              )
            })
          }
        </div>
        <Button type="primary" text onClick={onClick} className='ml-8'>
          {i18n('ui.edit')}
        </Button>
      </div>
    )
  }
  return (
    <Wrapper>
      <Balloon
        trigger={<Icon className={`tag_icon ${dataSource.length > 0 ? 'not_empty' : 'empty'}`} type="label" />}
        closable={false}
        autoFocus={false}
        className={dataSource.length > 0 ? 'pl-16 pr-16' : ''}
        popupStyle={{ wordBreak: 'break-all', maxWidth: 500 }}
      >
        {render()}
      </Balloon>
    </Wrapper>
  );
};

const Wrapper = styled.span`
.tag_icon {
  cursor: pointer;
  &::before {
    width: 14px !important;
    font-size: 14px !important;
  }
  &.empty {
    color: #c1c1c1;
  }
  &.not_empty {
    color: #888;
    &:hover {
      color: #333;
    }
  }
}
`

export default ColumnTags;
