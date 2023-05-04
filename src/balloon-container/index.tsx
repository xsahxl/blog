import React, { useState, FC, PropsWithChildren } from 'react';
import { Balloon, Button, Icon, Form, Input, Select, Field } from '@alicloud/console-components';
import { BalloonProps } from '@alicloud/console-components/types/balloon';
import { isNoneEmpty, noop } from '../utils';
import { get, map } from 'lodash';
import i18n from '../i18n';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

type Item = {
  label: string;
  name: string;
  value?: string;
  required?: boolean;
  props?: Record<string, any>;
}

type Props = PropsWithChildren & BalloonProps & {
  title?: React.ReactNode;
  trigger?: React.ReactNode;
  triggerType?: 'click' | 'hover';
  dataSource?: Item[]
  closable?: boolean;
  popupStyle?: React.CSSProperties;
  onConfirm?: (value: Item[]) => Promise<any>;
  onCancel?: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;

}
const BalloonContainer: FC<Props> = (props) => {
  const {
    title,
    trigger,
    triggerType = 'click',
    dataSource = [
      {
        label: 'label',
        name: 'label',
      },
      {
        label: 'value',
        name: 'value',
      },
    ],
    closable = false,
    popupStyle = {},
    children,
    onConfirm = noop,
    onCancel = noop,
    confirmButtonText = i18n('ui.button.confirm'),
    cancelButtonText = i18n('ui.button.cancel'),
    ...rest
  } = props;

  const field = Field.useField();
  const { init, validate } = field;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaultTrigger = () => {
    if (isNoneEmpty(trigger)) {
      return (
        <span style={{ cursor: 'pointer', color: '#07c' }} onClick={() => setVisible(true)}>
          {trigger}
        </span>
      );
    }
    return (
      <Button type="primary" text onClick={() => setVisible(true)}>
        <Icon type="add" />
      </Button>
    );
  };

  const handleConfirm = async () => {
    validate(async (errors: any, values: any) => {
      if (errors) return;
      setLoading(true);
      try {
        await onConfirm(values);
        setVisible(false);
      } catch (error) { }
      setLoading(false);
    })

  };

  const handleCancel = () => {
    setVisible(false);
    onCancel();
  };

  const defaultChildren = () => {
    if (isNoneEmpty(children)) {
      return (
        <div className='p-4'>
          {children}
        </div>
      );
    }
    return (
      <>
        {isNoneEmpty(title) && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 400 }}>{title}</span>
            <span className="icon_close" onClick={() => setVisible(false)}>
              <Icon type="close" size="xs" />
            </span>
          </div>
        )}
        <Form {...formItemLayout} field={field} style={{ padding: '16px 8px' }}>
          {map(dataSource, (item: Item) => {
            const required = get(item, 'props.required', true);
            const rules = get(item, 'props.rules', {
              required,
              message: i18n('ui.field_is_required', { value: item.label }),
            })
            return (
              <FormItem label={item.label} key={item.label} required={required}>
                {get(item, 'props.dataSource') ? (
                  <Select
                    {...item.props}
                    style={{ width: '100%' }}
                    {...init(item.name, {
                      initValue: item.value,
                      rules,
                    })}
                  />
                ) : <Input
                  {...item.props}
                  {...init(item.name, {
                    initValue: item.value,
                    rules,
                  })}
                />}
              </FormItem>
            )
          })}
          <FormItem style={{ marginBottom: 0, textAlign: 'right' }}>
            <Button type="primary" loading={loading} onClick={handleConfirm} >
              {confirmButtonText}
            </Button>
            <Button className='ml-8' onClick={handleCancel}>{cancelButtonText}</Button>
          </FormItem>
        </Form>
      </>
    );
  };
  if (triggerType === 'hover') {
    return (
      <Balloon
        {...rest}
        closable={closable}
        trigger={trigger}
        triggerType="hover"
        popupStyle={{ maxWidth: 500, minWidth: 180, ...popupStyle }}
      >
        <div style={{ padding: '8px 0' }}>{children}</div>
      </Balloon>
    )
  }
  return (
    <Balloon
      {...rest}
      closable={closable}
      trigger={defaultTrigger()}
      triggerType="click"
      visible={visible}
      onClose={() => setVisible(false)}
      popupStyle={{ maxWidth: 'unset', minWidth: 180, ...popupStyle }}
    >
      {defaultChildren()}
    </Balloon>
  );
}

export default BalloonContainer;
