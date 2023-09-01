import SlidePanel, { SlidePanelProps } from '@alicloud/console-components-slide-panel';
import React, { FC } from 'react';
import i18n from '../i18n';

const MySlidePanel: FC<SlidePanelProps> = props => {
  return <SlidePanel {...props} okText={i18n('ui.button.confirm')} cancelText={i18n('ui.button.cancel')} />;
};

export default MySlidePanel;
