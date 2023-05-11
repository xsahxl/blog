import React, { FC, useState } from 'react';
import { Button, Grid, Icon, Select } from '@alicloud/console-components';
import { Rule } from '@alicloud/console-components/types/field';
import ColumnTag from './components/ColumnTag';
import { concat, every, filter, find, get, isArray, isEmpty, map, uniqueId } from 'lodash';
import i18n from '../i18n';
import { useRequest } from 'ahooks';
import { isNoneEmpty, noop } from '../utils';


const { Row, Col } = Grid;

type IItem = {
  id: string;
  key?: string;
  value?: string;
  values?: string[];
  error?: boolean;
};

type Props = {
  value?: IItem[];
  onChange?: (value: IItem[]) => void;
  keyMaxLength?: number;
  valueMaxLength?: number;
  limit?: number;
  fetchData?: () => Promise<{ key: string, value: string }[]>;
};

const customFormat = (value: IItem[]) => {
  if (isEmpty(value)) return;
  const newData = filter(value, (item) => item.key && item.value);
  return map(newData, (item: IItem) => ({ key: item.key, value: item.value }))
};

const customValidate = (
  rule: Rule,
  value: IItem[],
  callback: (error?: string) => void,
) => {
  const newData = filter(value, (item) => item.key);
  if (newData.length === 0) {
    return callback(i18n('ui.common.at_least_one_data_required'));
  }
  const newList = filter(newData, (item: IItem) => item.error);
  if (newList.length > 0) {
    return callback(i18n('ui.no_duplicate_label_keys'));
  }
  callback();
};

const TagContainerWithPure: FC<Props> = (props) => {
  const {
    value,
    onChange = noop,
    keyMaxLength = 64,
    valueMaxLength = 64,
    fetchData = noop,
    limit = +Infinity,
  } = props;
  const defaultValue = isEmpty(value)
    ? [{ id: uniqueId() }]
    : concat(map(value, (item) => ({ ...item, id: uniqueId() })), { id: uniqueId() });
  const [list, setList] = useState<IItem[]>(defaultValue);
  const { data } = useRequest(fetchData);

  const handleDelete = (id: string) => {
    const option = filter(list, (item) => item.id !== id);
    checkKey(option);
  };

  const handleChangeKey = (key: string, id: string) => {
    const option = map(list, (item) =>
      item.id === id ? { ...item, key, value: undefined, values: getValues(key) } : item,
    );
    checkKey(option);
  };
  const checkKey = (option: IItem[]) => {
    // 如果每一个key有值 && 长度小于限制，就添加一个空的
    const shouldAdd = every(option, item => isNoneEmpty(item.key));
    option.length < limit && shouldAdd && option.push({ id: uniqueId() });
    // 如果key重复，就标记错误
    const newList = map(option, item => {
      const newOption = filter(option, (obj) => obj.key === item.key);
      return { ...item, error: newOption.length > 1 }
    });
    setList(newList);
    onChange(newList)
  }

  const handleChangeValue = (value: string, id: string) => {
    const option = map(list, (item) =>
      item.id === id ? { ...item, value } : item,
    );
    setList(option);
    onChange(option);
  };

  const getValues = (key: string | undefined) => {
    if (isEmpty(key)) return [];
    const findObj = find(data, item => item.key === key);
    const value = get(findObj, 'value', [])
    if (isEmpty(value)) return [];
    return isArray(value) ? value : [value];
  }

  return (
    <>
      {map(list, (item, index) => {
        return (
          <div key={item.id} className={index === 0 ? '' : 'mt-8'}>
            <Row className='align-center'>
              <Col span="11" className="space-between">
                <Select.AutoComplete
                  addonTextBefore={i18n('ui.label_key')}
                  className='full-width'
                  value={item.key}
                  onChange={(val: string) => handleChangeKey(val, item.id)}
                  maxLength={keyMaxLength}
                  placeholder={i18n('ui.please_select_or_enter_the_complete_key')}
                  dataSource={map(data, obj => obj.key)}
                  style={{ border: item.error ? '1px solid red' : 'unset' }}
                />
                <div className='ml-16' style={{ lineHeight: '32px' }}>:</div>
              </Col>
              <Col span="11" className="pl-16">
                <Select.AutoComplete
                  className='full-width'
                  addonTextBefore={i18n('ui.label_value')}
                  value={item.value}
                  disabled={isEmpty(item.key)}
                  maxLength={valueMaxLength}
                  placeholder={i18n('ui.please_select_or_enter_the_complete_key')}
                  onChange={(val: string) => handleChangeValue(val, item.id)}
                  dataSource={item.values}
                />
              </Col>
              {list.length > 1 && (
                <Col span="2" className="pl-16 pr-16">
                  <Button text iconSize='xs'>
                    <Icon
                      type="ashbin"
                      onClick={() => handleDelete(item.id)}
                    />
                  </Button>
                </Col>
              )}
            </Row>
          </div>
        );
      })}
    </>
  );
};

export default class TagContainer extends React.Component<Props> {
  static customFormat = customFormat;
  static customValidate = customValidate;
  static ColumnTag = ColumnTag;
  render() {
    return <TagContainerWithPure {...this.props} />;
  }
};