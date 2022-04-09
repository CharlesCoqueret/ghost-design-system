import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Link, { ILinkProps } from './Link';

export default {
  title: 'Atom/Link',
  component: Link,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' }, layout: 'centered' },
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args: ILinkProps) => {
  return <Link {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  text: ' Link Text',
  link: 'https://google.com',
  tooltip: 'Information about the link in a tooltip',
};
