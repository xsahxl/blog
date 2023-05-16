import Truncate from '@alicloud/console-components-truncate';
import React, { useState } from 'react';

const sentence =
  '改变窗口的大小，我只会在宽度不足的时候截断。宽度足够的时候我不会截断！';

const Demo = () => {
  const [isOverflow, setIsOverflow] = useState(false);
  return (
    <div className="truncate-demo">
      <Truncate
        type="width"
        threshold="auto"
        align="b"
        style={{ width: '100%' }}
        isOverflowChange={(newIsOverflow) => {
          console.log('isOverflowChange', newIsOverflow);
          setIsOverflow(newIsOverflow);
        }}
      >
        {sentence}
      </Truncate>
      <p>isOverflow: {isOverflow ? 'true' : 'false'}</p>
    </div>
  );
};
export default Demo;
