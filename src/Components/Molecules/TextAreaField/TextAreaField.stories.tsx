import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TextAreaField, ITextAreaFieldProps } from './TextAreaField';

export default {
  title: 'Molecule/TextareaField',
  component: TextAreaField,
  parameters: { controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof TextAreaField>;

const Template: ComponentStory<typeof TextAreaField> = (args: ITextAreaFieldProps) => {
  return <TextAreaField {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Placeholder text',
  name: 'name',
  label: 'Text field',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  inputValue: 'This is a rather long sample text',
  name: 'name',
  label: 'Text field in read only with label size = 4 and field size = 2',
  readOnly: true,
  fieldSize: 2,
  labelSize: 4,
};

export const Error = Template.bind({});
Error.args = {
  placeholder: 'Placeholder text',
  name: 'name',
  label: 'Text field in error',
  errorMessage: 'This text is on error',
};

export const HelperAndCounter = Template.bind({});
HelperAndCounter.args = {
  name: 'name',
  label: 'Text field with helper and counter',
  helperText: 'Helper text',
  mandatory: true,
  maxLength: 20,
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  name: 'name',
  label: 'Text field highlighted',
  inputValue: 'This is a highlighted sample text',
  readOnly: true,
  highlighted: true,
  helperText: 'Helper text',
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: 'name',
  label: 'Text field disabled',
  inputValue: 'This is a disabled sample text',
  disabled: true,
  helperText: 'Helper text',
};
