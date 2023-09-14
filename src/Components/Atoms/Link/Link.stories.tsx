import React from 'react';

import LinkComponent, { ILinkProps } from './Link';

export default {
  title: 'Atom/Link',
  component: LinkComponent,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' }, layout: 'centered' },
};

const Template = (args: ILinkProps) => {
  return <LinkComponent {...args}>Link Text</LinkComponent>;
};

export const Link = Template.bind({
  to: { pathname: 'https://google.com' },
  tooltip: 'Information about the link in a tooltip',
  externalLink: true,
});
