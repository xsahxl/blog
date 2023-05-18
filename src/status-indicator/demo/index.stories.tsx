import '@alicloud/console-components/dist/wind.css';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Basic from './basic';
import CustomIcon from './custom-icon';
import Dot from './dot';

storiesOf('wind-rc-status-indicator', module)
  .add('Basic', () => <Basic />)
  .add('Dot', () => <Dot />)
  .add('CustomIcon', () => <CustomIcon />);
