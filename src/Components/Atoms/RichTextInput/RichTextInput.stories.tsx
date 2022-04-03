import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import RichTextInput, { IRichTextInputProps } from './RichTextInput';

export default {
  title: 'Atom/RichTextInput',
  component: RichTextInput,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof RichTextInput>;

const Template: ComponentStory<typeof RichTextInput> = (args: IRichTextInputProps) => {
  return <RichTextInput {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  enableImage: true,
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
