import { Button } from '@alicloud/console-components';
import { SlidePanel } from '@xsahxl/ui';
import React, { useState } from 'react';

const SlidePanelDemo: React.FC<{}> = () => {
  const [active, setActive] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setActive(true);
        }}
      >
        open
      </Button>
      <SlidePanel
        placement="bottom"
        title="BottonPanel"
        isShowing={active}
        width="medium"
        onMaskClick={() => {
          setActive(false);
        }}
      >
        content
      </SlidePanel>
    </>
  );
};

export default SlidePanelDemo;
