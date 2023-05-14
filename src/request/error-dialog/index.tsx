import { Button, Dialog, Icon } from '@alicloud/console-components';
import { QuickShowConfig } from '@alicloud/console-components/types/dialog';
import React from 'react';
import styled from 'styled-components';
import i18n from '../../i18n';
import { ResponseDataCodeError } from '../http-errors';
import store from '../store';
import Content from './content';

const DialogContentWrapper = styled.div`
  min-width: 450px;
  max-width: 800px;
  line-height: 1.5;
  font-size: 12px;
  word-break: break-all;
  margin-left: 24px;
  margin-top: -24px;
`;

document.addEventListener('keyup', (e: KeyboardEvent) => {
  if (e.key === 'Escape' && store.getInstance()) {
    store.clearInstance();
  }
});

const createDialog = (options: QuickShowConfig = {}) => {
  if (store.getInstance()) return;
  const instance = Dialog.show({
    shouldUpdatePosition: true,
    isFullScreen: true,
    closeable: false,
    title: (
      <div className="align-center">
        <Icon type="error" size="medium" className="color-error" />
        <span className="ml-4">{i18n('ui.error')}</span>
      </div>
    ),
    footer: (
      <Button type="primary" onClick={() => store.clearInstance()}>
        {i18n('ui.footer.close')}
      </Button>
    ),
    ...options,
    content: <DialogContentWrapper>{options.content}</DialogContentWrapper>,
  });
  store.setInstance(instance);
};

const ERR_NEED_LOGIN = 'NeedLogin';
const ERR_POSTONLY_OR_TOKEN = 'PostonlyOrTokenError';

export default (
  error = {} as ResponseDataCodeError,
  config: Record<string, any> = {},
) => {
  const { code } = error;

  // 处理公共报错
  switch (code) {
    case ERR_NEED_LOGIN: {
      createDialog({
        content: i18n('ui.login_token_had_expired'),
      });
      break;
    }
    case ERR_POSTONLY_OR_TOKEN: {
      createDialog({
        content: i18n('ui.refresh_page_and_try_again'),
      });
      break;
    }
    default: {
      createDialog({
        content: <Content error={error} config={config} />,
      });
      break;
    }
  }
};
