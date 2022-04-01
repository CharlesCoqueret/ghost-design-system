import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import SideBar from './SideBar';
import SideBarSection, { ISideBarSectionProps } from './SideBarSection';

export default {
  title: 'Organism/SideBar/SideBarSection',
  component: SideBarSection,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof SideBarSection>;

const Template: ComponentStory<typeof SideBarSection> = (args: ISideBarSectionProps) => (
  <Router>
    <SideBar backToMenu={'Back to menu'} style={{ height: '600px' }} unfixed>
      <SideBarSection {...args} />
    </SideBar>
  </Router>
);

export const Default = Template.bind({});
Default.args = {
  section: {
    title: 'Section #1',
    items: [
      {
        label: 'Direct link #1',
        to: '/link1',
      },
      {
        label: 'Direct link #2',
        to: '/link2',
      },
      {
        label: 'With subitems',
        to: '/link3',
        subItems: [
          {
            label: 'Direct link #1',
            to: '/link3/link1',
          },
          {
            label: 'Direct link #2',
            to: '/link3/link2',
          },
        ],
      },
    ],
  },
};
