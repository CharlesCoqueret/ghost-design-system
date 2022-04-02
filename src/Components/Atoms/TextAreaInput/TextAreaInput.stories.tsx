import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextAreaInput, { ITextAreaInputProps } from './TextAreaInput';

export default {
  title: 'Atom/TextAreaInput',
  component: TextAreaInput,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof TextAreaInput>;

const Template: ComponentStory<typeof TextAreaInput> = ({ inputValue, ...args }: ITextAreaInputProps) => {
  const [localValue, setLocalValue] = useState<string>(inputValue);

  return (
    <TextAreaInput
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
