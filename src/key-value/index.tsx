import { Button, Grid, Icon, Input } from '@alicloud/console-components';
import { Rule } from '@alicloud/console-components/types/field';
import { concat, filter, isEmpty, map, noop, set, uniqueId } from 'lodash';
import React, { FC, useState } from 'react';
import i18n from '../i18n';

const { Row, Col } = Grid;

type IItem = {
  id: string;
  key?: string;
  value?: string;
};

type Props = {
  value?: IItem[];
  onChange?: (value: IItem[]) => void;
  prefixKeyText?: string;
  prefixValueText?: string;
};

const customFormat = (value: IItem[]) => {
  if (isEmpty(value)) return;
  const obj = {};
  for (const item of value) {
    set(obj, item.key as string, item.value);
  }
  return obj;
};

const customValidate = (rule: Rule, value: IItem[], callback: (error?: string) => void) => {
  const newData = filter(value, item => item.key && item.value);
  if (newData.length === 0) {
    return callback(i18n('ui.common.at_least_one_complete_data_required'));
  }
  callback();
};

const KeyValueWithPure: FC<Props> = props => {
  const { value, onChange = noop, prefixKeyText = 'Key', prefixValueText = 'Value' } = props;
  const defaultValue = isEmpty(value) ? [{ id: uniqueId() }] : map(value, item => ({ ...item, id: uniqueId() }));
  const [list, setList] = useState<IItem[]>(defaultValue);

  const handleAdd = () => {
    const option = concat(list, { id: uniqueId() });
    setList(option);
    onChange(option);
  };

  const handleDelete = (id: string) => {
    const option = filter(list, item => item.id !== id);
    setList(option);
    onChange(option);
  };

  const handleChangeKey = (key: string, id: string) => {
    const option = map(list, item => (item.id === id ? { ...item, key } : item));
    setList(option);
    onChange(option);
  };

  const handleChangeValue = (value: string, id: string) => {
    const option = map(list, item => (item.id === id ? { ...item, value } : item));
    setList(option);
    onChange(option);
  };

  return (
    <>
      {map(list, item => {
        return (
          <Row
            key={item.id}
            style={{
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Col span="11" className="pr-16">
              <Input addonTextBefore={prefixKeyText} style={{ width: '100%' }} value={item.key} onChange={key => handleChangeKey(key, item.id)} />
            </Col>
            <Col span="11" className="pl-16">
              <Input addonTextBefore={prefixValueText} style={{ width: '100%' }} value={item.value} onChange={value => handleChangeValue(value, item.id)} />
            </Col>
            {list.length > 1 && (
              <Col span="2" className="pl-16 pr-16">
                <Icon className="cursor-pointer" size="xs" type="ashbin" onClick={() => handleDelete(item.id)} />
              </Col>
            )}
          </Row>
        );
      })}
      <Button onClick={handleAdd}>{i18n('ui.common.add')}</Button>
    </>
  );
};

export default class KeyValue extends React.Component<Props> {
  static customFormat = customFormat;
  static customValidate = customValidate;
  render() {
    return <KeyValueWithPure {...this.props} />;
  }
}
