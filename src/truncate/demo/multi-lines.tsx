import { MultiLines } from '@alicloud/console-components-truncate';
import React from 'react';

const longText =
  '毕竟西湖六月中，风光不与四时同。接天莲叶无穷碧，映日荷花别样红。'.repeat(10);

const Demo = () => {
  return (
    <MultiLines lines={2} ellipsis={<span>...</span>}>
      {longText}
    </MultiLines>
  );
};

export default Demo;
