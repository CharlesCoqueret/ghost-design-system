import React, { useRef, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Popover, { IPopoverProps } from './Popover';
import Button, { ColorButtonEnum } from '../Button/Button';

export default {
  title: 'Molecule/Popover',
  component: Popover,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args: IPopoverProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }} ref={ref}>
      <Button
        icon={['fal', 'trash-alt']}
        onClick={() => {
          setOpen(true);
        }}
        color={ColorButtonEnum.REVERSED}
      />
      <Popover
        anchorRef={ref}
        open={open}
        title='Delete?'
        buttons={[
          {
            label: 'Cancel',
            color: ColorButtonEnum.SECONDARY,
            onClick: () => {
              console.log('cancelled');
              setOpen(false);
            },
          },
          {
            label: 'Confirm',
            color: ColorButtonEnum.PRIMARY,
            onClick: () => {
              console.log('confirmed');
              setOpen(false);
            },
          },
        ]}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
