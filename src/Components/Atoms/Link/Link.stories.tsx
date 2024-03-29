import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LinkComponent, { ILinkProps } from './Link';

export default {
  title: 'Atom/Link',
  component: LinkComponent,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' }, layout: 'centered' },
} as ComponentMeta<typeof LinkComponent>;

const Template: ComponentStory<typeof LinkComponent> = (args: ILinkProps) => {
  return <LinkComponent {...args} />;
};

export const Link = Template.bind({});
Link.args = {
  text: ' Link Text',
  to: { pathname: 'https://google.com' },
  tooltip: 'Information about the link in a tooltip',
  externalLink: true,
};
