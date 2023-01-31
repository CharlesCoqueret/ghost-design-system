import React, { useRef, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Popover, { IPopoverProps } from './Popover';
import Button, { ColorButtonEnum } from '../Button/Button';

export default {
  title: 'Molecule/Popover',
  component: Popover,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' }, layout: 'centered' },
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args: IPopoverProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref}>
      <Button
        label='Click me to see the popover'
        icon={['fal', 'trash-alt']}
        onClick={() => {
          setOpen(true);
        }}
        color={ColorButtonEnum.REVERSED}
      />
      <Popover
        {...args}
        anchorRef={ref}
        buttons={[
          {
            label: 'Cancel',
            color: ColorButtonEnum.SECONDARY,
            onClick: () => {
              console.log('Cancelled');
              setOpen(false);
            },
          },
          {
            label: 'Confirm',
            color: ColorButtonEnum.PRIMARY,
            onClick: () => {
              console.log('Confirmed');
              setOpen(false);
            },
          },
        ]}
        open={open}
        onClose={() => {
          console.log('Cancelled because of click outside');
          setOpen(false);
        }}
        title='Delete?'
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
