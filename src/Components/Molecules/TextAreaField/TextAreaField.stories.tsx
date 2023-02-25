import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TextAreaField, ITextAreaFieldProps } from './TextAreaField';

export default {
  title: 'Molecule/TextareaField',
  component: TextAreaField,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof TextAreaField>;

const Template: ComponentStory<typeof TextAreaField> = (args: ITextAreaFieldProps) => {
  const [localValue, setLocalValue] = useState<string | undefined>(args.inputValue);

  return (
    <TextAreaField
      {...args}
      inputValue={localValue}
      onChange={(value) => {
        if (args.onChange) {
          args.onChange(value);
        }
        setLocalValue(value);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Placeholder text',
  name: 'name',
  label: 'Text field',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  inputValue:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fringilla sit amet odio vitae dapibus. Cras ' +
    'ultricies lacus ac porttitor lacinia. Sed sed dapibus elit. Mauris facilisis vitae nunc ac hendrerit. Maecenas ' +
    'sit amet leo urna. Quisque volutpat tincidunt odio, sit amet lobortis tortor aliquet quis. Proin molestie ' +
    'rhoncus massa. Fusce sagittis urna id efficitur convallis. Nam risus velit, vulputate a lectus eget, lobortis ' +
    'lobortis nunc. Nunc tincidunt eros vitae consectetur ultricies. Donec vel mauris tempor, lobortis massa vel, ' +
    'consectetur elit. Curabitur dignissim quam sed odio feugiat elementum.\n' +
    'Etiam urna leo, placerat eu pellentesque id, vestibulum vitae erat. Quisque hendrerit pharetra aliquet. ' +
    'Vestibulum porta quis ipsum at vestibulum. Aenean ornare augue a tortor sollicitudin porttitor. Pellentesque ' +
    'vehicula purus turpis, et ultrices leo aliquam vitae. Curabitur id convallis augue, at sollicitudin nunc. ' +
    'Nulla porttitor, neque id hendrerit feugiat, ex ligula feugiat ligula, eget accumsan sapien felis quis eros. ' +
    'Aliquam ac ornare sem, sit amet facilisis eros. Nulla gravida, ipsum quis convallis sodales, nibh arcu ' +
    'venenatis quam, eu commodo leo leo vel metus. Sed vel vestibulum sapien. Vivamus eu felis eget purus ' +
    'pellentesque maximus at quis turpis. Duis ornare venenatis turpis, vitae tempor urna mollis ac.\n',
  name: 'name',
  label: 'Text field in read only with label size = 6 and field size = 4',
  readOnly: true,
  fieldSize: 4,
  labelSize: 6,
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
