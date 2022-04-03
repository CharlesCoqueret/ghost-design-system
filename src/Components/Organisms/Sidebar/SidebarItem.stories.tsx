import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import SideBar from './SideBar';
import { ISideBarItemProps, SideBarItem } from './SideBarSection';

export default {
  title: 'Organism/SideBar/SideBarItem',
  component: SideBarItem,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof SideBarItem>;

const Template: ComponentStory<typeof SideBarItem> = (args: ISideBarItemProps) => (
  <Router>
    <SideBar backToMenu={'Back to menu'} style={{ height: '600px' }} unfixed>
      <SideBarItem {...args} />
    </SideBar>
  </Router>
);

export const Default = Template.bind({});
Default.args = {
  item: {
    label: 'Direct link #1',
    to: '/link1',
  },
};

export const Hidden = Template.bind({});
Hidden.args = {
  item: {
    label: 'Direct link #1',
    to: '/link1',
    hidden: true,
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  item: {
    label: 'Direct link #1',
    to: '/link1',
    disabled: true,
  },
};

export const SubItems = Template.bind({});
SubItems.args = {
  item: {
    label: 'With subitems',
    to: '/link1',
    subItems: [
      {
        label: 'Direct link #1',
        to: '/link1/link1',
      },
      {
        label: 'Direct link #2',
        to: '/link1/link2',
      },
    ],
  },
};

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  item: {
    label: 'External link',
    to: '/link1',
    externalLink: true,
  },
};
