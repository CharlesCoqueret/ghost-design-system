import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RichTextField, IRichTextFieldProps } from './RichTextField';

export default {
  title: 'Molecule/RichTextField',
  component: RichTextField,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof RichTextField>;

const Template: ComponentStory<typeof RichTextField> = (args: IRichTextFieldProps) => {
  return (
    <RichTextField
      {...args}
      onChange={(file: string) => {
        if (args.onChange) {
          args.onChange(file);
        }
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Rich text field',
  enableImage: true,
  enableLink: true,
  inputValue:
    '<h1>Lorem ipsum</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur ' +
    'tortor nec lorem euismod imperdiet quis vel turpis. Phasellus ultricies nibh vitae laoreet tempus. ' +
    'Quisque vel dolor id arcu dignissim condimentum eu vel purus. Donec auctor, ipsum vel hendrerit ' +
    'molestie, ex quam convallis quam, aliquam laoreet metus nibh in diam. Nam id vulputate magna. Cras ' +
    'ullamcorper eget ipsum ut finibus. Suspendisse a porttitor velit. Integer condimentum mauris et ' +
    'mollis imperdiet. Fusce blandit convallis posuere. Phasellus vehicula purus ullamcorper mauris ' +
    'facilisis eleifend.</p>',
  locale: 'fr',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  label: 'Rich text field read only',
  enableImage: true,
  enableLink: true,
  inputValue:
    '<h1>Lorem ipsum</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur ' +
    'tortor nec lorem euismod imperdiet quis vel turpis. Phasellus ultricies nibh vitae laoreet tempus. ' +
    'Quisque vel dolor id arcu dignissim condimentum eu vel purus. Donec auctor, ipsum vel hendrerit ' +
    'molestie, ex quam convallis quam, aliquam laoreet metus nibh in diam. Nam id vulputate magna. Cras ' +
    'ullamcorper eget ipsum ut finibus. Suspendisse a porttitor velit. Integer condimentum mauris et ' +
    'mollis imperdiet. Fusce blandit convallis posuere. Phasellus vehicula purus ullamcorper mauris ' +
    'facilisis eleifend.</p>',
  readOnly: true,
};

export const Error = Template.bind({});
Error.args = {
  errorMessage: 'This file fied is on error',
  fieldSize: 4,
  labelSize: 4,
  label: 'Rich text field in error with label size = 4 and field size = 4',
  inputValue:
    '<h1>Lorem ipsum</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur ' +
    'tortor nec lorem euismod imperdiet quis vel turpis. Phasellus ultricies nibh vitae laoreet tempus. ' +
    'Quisque vel dolor id arcu dignissim condimentum eu vel purus. Donec auctor, ipsum vel hendrerit ' +
    'molestie, ex quam convallis quam, aliquam laoreet metus nibh in diam. Nam id vulputate magna. Cras ' +
    'ullamcorper eget ipsum ut finibus. Suspendisse a porttitor velit. Integer condimentum mauris et ' +
    'mollis imperdiet. Fusce blandit convallis posuere. Phasellus vehicula purus ullamcorper mauris ' +
    'facilisis eleifend.</p>',
};

export const HelperAndLimit = Template.bind({});
HelperAndLimit.args = {
  helperText: 'Helper text',
  mandatory: true,
  label: 'Rich text field with helper',
  inputValue:
    '<h1>Lorem ipsum</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur ' +
    'tortor nec lorem euismod imperdiet quis vel turpis. Phasellus ultricies nibh vitae laoreet tempus. ' +
    'Quisque vel dolor id arcu dignissim condimentum eu vel purus. Donec auctor, ipsum vel hendrerit ' +
    'molestie, ex quam convallis quam, aliquam laoreet metus nibh in diam. Nam id vulputate magna. Cras ' +
    'ullamcorper eget ipsum ut finibus. Suspendisse a porttitor velit. Integer condimentum mauris et ' +
    'mollis imperdiet. Fusce blandit convallis posuere. Phasellus vehicula purus ullamcorper mauris ' +
    'facilisis eleifend.</p>',
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  readOnly: true,
  highlighted: true,
  label: 'Rich text field highlighted',
  inputValue:
    '<h1>Lorem ipsum</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur ' +
    'tortor nec lorem euismod imperdiet quis vel turpis. Phasellus ultricies nibh vitae laoreet tempus. ' +
    'Quisque vel dolor id arcu dignissim condimentum eu vel purus. Donec auctor, ipsum vel hendrerit ' +
    'molestie, ex quam convallis quam, aliquam laoreet metus nibh in diam. Nam id vulputate magna. Cras ' +
    'ullamcorper eget ipsum ut finibus. Suspendisse a porttitor velit. Integer condimentum mauris et ' +
    'mollis imperdiet. Fusce blandit convallis posuere. Phasellus vehicula purus ullamcorper mauris ' +
    'facilisis eleifend.</p>',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  label: 'Rich text field disabled',
  inputValue:
    '<h1>Lorem ipsum</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur ' +
    'tortor nec lorem euismod imperdiet quis vel turpis. Phasellus ultricies nibh vitae laoreet tempus. ' +
    'Quisque vel dolor id arcu dignissim condimentum eu vel purus. Donec auctor, ipsum vel hendrerit ' +
    'molestie, ex quam convallis quam, aliquam laoreet metus nibh in diam. Nam id vulputate magna. Cras ' +
    'ullamcorper eget ipsum ut finibus. Suspendisse a porttitor velit. Integer condimentum mauris et ' +
    'mollis imperdiet. Fusce blandit convallis posuere. Phasellus vehicula purus ullamcorper mauris ' +
    'facilisis eleifend.</p>',
};
