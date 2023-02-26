import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LinkComponent, { ILinkProps } from './Link';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
  title: 'Atom',
  component: LinkComponent,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' }, layout: 'centered' },
} as ComponentMeta<typeof LinkComponent>;

const Template: ComponentStory<typeof LinkComponent> = (args: ILinkProps) => {
  return (
    <Router>
      <LinkComponent {...args} />
    </Router>
  );
};

export const Link = Template.bind({});
Link.args = {
  text: ' Link Text',
  to: 'https://hamster.dance/hamsterdance/',
  tooltip: 'Information about the link in a tooltip',
  externalLink: true,
};
