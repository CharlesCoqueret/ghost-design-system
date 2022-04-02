import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import SideBar, { ISideBarProps } from './SideBar';
import { ISideBarSection } from './SideBarSection';

export default {
  title: 'Organism/SideBar',
  component: SideBar,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = (args: ISideBarProps) => (
  <Router>
    <SideBar {...args} />
  </Router>
);

const sections: Array<ISideBarSection> = [
  {
    title: 'Section #1',
    items: [
      {
        label: 'Direct link #1',
        to: '/link1',
      },
      {
        label: 'Direct link #2 - external link',
        to: '/link2',
        externalLink: true,
      },
      {
        label: 'Direct link #3',
        to: '/link3',
      },
    ],
  },
  {
    title: 'Section #2',
    items: [
      {
        label: 'Disabled subsection #2-1',
        to: '/link4',
        disabled: true,
        subItems: [
          {
            label: 'Direct link 1 in #2-1',
            to: '/link4/link1',
          },
          {
            label: 'Direct link 2 in #2-2',
            to: '/link4/link2',
          },
        ],
      },
      {
        label: 'Subsection #2-2 with divider',
        to: '/link5',
        subItems: [
          {
            label: 'Direct link 1 in #2-2',
            to: '/link5/link1',
          },
          {
            label: 'Direct link 2 in #2-2',
            to: '/link5/link2',
          },
        ],
      },
      {
        label: 'Subsection #2-3',
        to: '/link6',
        subItems: [
          {
            label: 'Direct link 1 in #2-3',
            to: '/link6/link1',
          },
          {
            label: 'Direct link 2 in #2-3',
            to: '/link6/link2',
          },
        ],
      },
      {
        label: 'Hidden subsection #2-4',
        to: '/link7',
        hidden: true,
        subItems: [
          {
            label: 'Direct link 1 in #2-4',
            to: '/link7/link1',
          },
          {
            label: 'Direct link 2 in #2-4',
            to: '/link7/link2',
          },
        ],
      },
    ],
  },
  {
    title: 'Section #3 with divider',
    divider: true,
    items: [
      {
        label: 'Subsection #3-1 with only one non-hidden subitem',
        to: '/link8',
        subItems: [
          {
            label: 'Hidden direct link 1 in #3-1',
            to: '/link8/link1',
            hidden: true,
          },
          {
            label: 'Direct link 3 in #3-1',
            to: '/link8/link2',
          },
        ],
      },
      {
        label: 'Subsection #3-2 with all subitems hidden',
        to: '/link9',
        subItems: [
          {
            label: 'Hidden direct link 1 in #3-2',
            to: '/link9/link1',
            hidden: true,
          },
          {
            label: 'Hidden direct link 2 in #3-2',
            to: '/link9/link2',
            hidden: true,
          },
        ],
      },
    ],
  },
  {
    divider: true,
    items: [
      {
        label: 'Direct link in invisible section with divider',
        to: '/link10',
      },
    ],
  },
];

export const Default = Template.bind({});
Default.args = {
  backToMenu: 'Back to menu',
  sections: sections,
  style: { height: '600px' },
  unfixed: true,
};
