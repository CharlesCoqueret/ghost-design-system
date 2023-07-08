import React from 'react';

import LinkComponent, { ILinkProps } from './Link';

export default {
  title: 'Atom/Link',
  component: LinkComponent,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' }, layout: 'centered' },
};

const Template = (args: ILinkProps) => {
  return <LinkComponent {...args} />;
};

export const Link = Template.bind({
  text: ' Link Text',
  to: { pathname: 'https://google.com' },
  tooltip: 'Information about the link in a tooltip',
  externalLink: true,
});
