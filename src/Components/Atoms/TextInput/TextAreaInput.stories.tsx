import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextInput, { ITextInputProps } from './TextInput';

export default {
  title: 'Atom/TextInput',
  component: TextInput,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = ({ inputValue, ...args }: ITextInputProps) => {
  const [localValue, setLocalValue] = useState<string>(inputValue);

  return (
    <TextInput
      {...args}
      inputValue={localValue}
      onChange={(event) => {
        setLocalValue(event.target.value);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
