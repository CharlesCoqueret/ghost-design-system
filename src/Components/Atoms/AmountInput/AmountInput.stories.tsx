import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AmountInput, { IAmountInputProps } from './AmountInput';

export default {
  title: 'Atom/AmountInput',
  component: AmountInput,
  parameters: { actions: { AmountInput: '^on.*' } },
} as ComponentMeta<typeof AmountInput>;

const Template: ComponentStory<typeof AmountInput> = ({ inputValue, ...args }: IAmountInputProps) => {
  const [localValue, setLocalValue] = useState<number | string | undefined>(inputValue);

  return (
    <>
      <AmountInput {...args} inputValue={localValue} onChange={setLocalValue} />
      <div style={{ height: '10vh' }} />
      <AmountInput {...args} readOnly={true} inputValue={localValue} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  inputValue: '1',
  suffix: '€',
  prefix: '$',
};
