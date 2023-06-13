import { Button } from '@alicloud/console-components';
import { SlidePanel } from '@xsahxl/ui';
import React, { useState } from 'react';

const SlidePanelDemo: React.FC<{}> = () => {
  const [active, setActive] = useState(false);
  const [innerActive, setInnerActive] = useState(false);

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
        title="CheckPanelShouldBeClosable"
        isShowing={active}
        width="medium"
        onMaskClick={() => {
          setActive(false);
        }}
      >
        content
        <Button
          onClick={() => {
            setInnerActive(true);
          }}
        >
          open inner
        </Button>
        <SlidePanel
          title="CheckPanelShouldBeClosable"
          isShowing={innerActive}
          width="small"
          onMaskClick={() => {
            setInnerActive(false);
          }}
        >
          content
        </SlidePanel>
      </SlidePanel>
    </>
  );
};

export default SlidePanelDemo;
