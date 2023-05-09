import { DatePicker, Dropdown, Field, Grid, Icon, Select, Button } from '@alicloud/console-components';
import { RangePickerProps } from '@alicloud/console-components/types/date-picker';
import cls from 'classnames';
import { map, noop, includes, get, filter } from 'lodash';
import moment from 'moment';
import React, { FC, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import i18n from '../i18n';
import { CommonProps } from '../types';
import { IActive, IChangeData, IMode, IModeValue, IQucikTimes, ITimeChild, } from './types';
import { getQucikTimes, transform } from './utils';
import { enable_loop_keys, loop_list, loop_off } from './constant';
import { isNoneEmpty } from '../utils';

const { Row, Col } = Grid;
const { RangePicker } = DatePicker;

type Props = CommonProps & {
  value: string | number[];
  mode?: IModeValue;
  placeholder?: string;
  quickTimes?: IQucikTimes[];
  onChange?: (value: IChangeData) => void;
  rangePickerProps?: RangePickerProps;
  showLoop?: boolean;
};

const TimeContainer: FC<Props> = (props) => {
  const {
    value,
    mode = IMode.realTime,
    placeholder = i18n('ui.common.select.placeholder'),
    quickTimes,
    onChange = noop,
    showLoop = true,
    rangePickerProps,
  } = props;
  const [visible, setVisible] = useState(false);
  const _quickTimes = getQucikTimes(mode, quickTimes as IQucikTimes[]);
  const defaultActive = transform(value, _quickTimes);
  const [actived, setActived] = useState(defaultActive as IActive);
  const field = Field.useField();
  const { init, getValue, resetToDefault } = field;
  const loopRef = useRef<NodeJS.Timeout>();

  const handleLoop = () => {
    clearTimeout(loopRef.current);
    loopRef.current = setTimeout(() => {
      onChange({
        key: actived.key,
        value: actived.getLoopValue?.(),
      });
      handleLoop();
    }, actived.loopTime);
  };

  useEffect(() => {
    actived.loopTime ? handleLoop() : clearTimeout(loopRef.current);
    return () => clearTimeout(loopRef.current);
  }, [actived.loopTime]);

  const handleItemCLick = (childs: ITimeChild) => {
    const value = childs.getValue();
    setActived({
      ...childs,
      momentValue: map(value, (item) => moment(item)),
    });
    onChange({
      key: childs.key,
      value,
    });
    setVisible(false);
  };

  const handleConfirm = () => {
    const params: moment.Moment[] = getValue('rangePicker');
    const data = {
      key: actived.key,
      label:
        actived.key === 'custom'
          ? `${params[0].format('YYYY-MM-DD HH:mm:ss')} - ${params[1].format('YYYY-MM-DD HH:mm:ss')}`
          : actived.label,
      momentValue: params,
      getValue: () => map(params, (item) => item.valueOf()),
      loopTime: getValue('loopTime') as number,
      getLoopValue: actived.getValue,
    };
    setActived(data);
    onChange({
      key: data.key,
      value: data.getValue(),
    });
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleClear = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setActived({} as IActive);
    resetToDefault()
    onChange({});
  };

  const loopRender = () => {
    if (!showLoop) return;
    return (
      <>
        <div className="mt-16 mb-8">{i18n('ui.refresh_rate')}</div>
        <Select
          dataSource={includes(enable_loop_keys, actived.key) ? loop_list : loop_off}
          className="full-width"
          {...init('loopTime', {
            initValue: actived.loopTime || 0,
          })}
        />
      </>
    )
  }

  const popRender = (
    <PopWrapper>
      {map(_quickTimes, (item) => {
        return (
          <div key={item.label} className="default_range">
            <span className="left_lable">{item.label}</span>
            <div className="right_content">
              <Row>
                {map(item.childs, (childs) => {
                  return (
                    <Col key={childs.key} span={8}>
                      <span
                        className={cls({
                          right_item: true,
                          actived: actived.key === childs.key,
                        })}
                        onClick={() => handleItemCLick(childs)}
                      >
                        {childs.label}
                      </span>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
        );
      })}
      <div className="mt-16 mb-8">{i18n('ui.custom')}</div>
      <RangePicker
        style={{ width: '100%' }}
        {...init('rangePicker', {
          initValue: actived.momentValue,
        })}
        onOk={() => setActived({ ...actived, key: 'custom' })}
        showTime
        format="YYYY-MM-DD"
        {...rangePickerProps}
      />
      {loopRender()}
      <div className='mt-16 text-right'>
        <Button
          type="primary"
          onClick={handleConfirm}
          disabled={get(filter(getValue('rangePicker') as number[], (item) => item), 'length') < 2}
        >
          {i18n('ui.button.confirm')}
        </Button>
        <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
          {i18n('ui.button.cancel')}
        </Button>
      </div>
    </PopWrapper>
  );
  return (
    <Dropdown
      trigger={
        <TriggerWrapper
          className={cls({
            focus: visible,
            clear_icon__container: isNoneEmpty(actived),
          })}
          onClick={() => setVisible((pre) => !pre)}
        >
          {actived.label ? <span>{actived.label}</span> : <span className="color-gray">{placeholder}</span>}
          <Icon className="calendar_icon" type="calendar" size="xs" />
          <Icon
            className="clear_icon"
            type="delete-filling"
            onClick={handleClear}
            size="xs"
          />
        </TriggerWrapper>
      }
      visible={visible}
      triggerType="click"
    >
      {popRender}
    </Dropdown>
  );
};

const TriggerWrapper = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  min-width: 180px;
  border: 1px solid #dedede;
  background-color: #fff;
  height: 32px;
  &:hover {
    border: 1px solid #737373;
  }
  &.focus {
    border: 1px solid #737373;
  }
  .calendar_icon {
    margin-left: 16px;
    color: #888;
  }
  .clear_icon {
    margin-left: 16px;
    color: #888;
    display: none;
    cursor: pointer;
  }
  &:hover {
    .calendar_icon {
      display: none;
    }
    .clear_icon {
      display: inline-block;
    }
  }
`;

const PopWrapper = styled.div`
  width: 480px;
  border: 1px solid #ddd;
  padding: 16px;
  background: #fff;
  z-index: 100;
  color: #333;
  box-shadow: 0 4px 6px 6px rgba(0, 0, 0, 0.1);
  font-size: 12px;
  .default_range {
    margin-bottom: 8px;
    display: flex;
    justify-content: flex-start;
    .left_lable {
      display: inline-block;
      color: #888;
      width: 80px;
    }
    .right_content {
      flex: 1;
      .right_item {
        cursor: pointer;
        &.actived {
          color: #07c;
        }
      }
    }
  }
`;
export default TimeContainer;
