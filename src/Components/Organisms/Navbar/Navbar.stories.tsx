import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Navbar, { INavBarProps } from './Navbar';

export default {
  title: 'Organism/Navbar',
  component: Navbar,
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args: INavBarProps) => {
  return <Navbar {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  brand: {
    logoSource: './images/logo.svg',
    link: '/',
  },
  navButtons: [
    {
      label: 'Label 1',
      subItems: [
        {
          label: 'Label 1',
          onClick: () => {
            console.log('label 1 - label 1');
          },
        },
        {
          label: 'Label 2',
          onClick: () => {
            console.log('label 1 - label 2');
          },
        },
        {
          label: 'Label 3',
          onClick: () => {
            console.log('label 1 - label 3');
          },
        },
        {
          label: 'Label 4',
          onClick: () => {
            console.log('label 1 - label 4');
          },
        },
      ],
    },
    {
      label: 'Label 2',
      subItems: [
        {
          label: 'Label 1',
          onClick: () => {
            console.log('label 2 - label 1');
          },
        },
        {
          label: 'Label 2',
          onClick: () => {
            console.log('label 2 - label 2');
          },
        },
        {
          label: 'Label 3',
          onClick: () => {
            console.log('label 2 - label 3');
          },
        },
        {
          label: 'Label 4',
          onClick: () => {
            console.log('label 2 - label 4');
          },
        },
      ],
    },
    {
      label: 'Label 3',
      onClick: () => {
        console.log('label 3');
      },
    },
  ],
  searchBar: {
    placeholder: 'Search',
    onSearch: () => {
      return Promise.resolve([<div>Result 1</div>, <div>Result 2</div>, <div>Result 3</div>]);
    },
  },
  navIcons: [
    {
      icon: ['fal', 'ballot-check'],
      counter: 2,
      subItems: [
        {
          label: 'Label 1',
        },
        {
          label: 'Label 2',
        },
        {
          label: 'Label 3',
        },
        {
          label: 'Label 4',
        },
      ],
    },
    {
      icon: ['fal', 'bell'],
      counter: '+99',
      customSubItem: (
        <div
          style={{
            maxWidth: '500px',
            height: '300px',
            padding: '0px 16px',
            overflowX: 'hidden',
            overflowY: 'scroll',
            backgroundColor: '#FFF',
          }}>
          <p>
            Lorem ipsum dolor sit amet. Ut voluptas reiciendis vel praesentium laborum hic voluptas asperiores nam rerum
            nihil obcaecati labore. Id praesentium porro ea placeat rerum aut tempore totam aut illum cupiditate sed
            laborum explicabo. Hic explicabo voluptatibus qui repellat fugiat ex voluptatum fuga qui architecto atque
            quo illum quas aut facilis nesciunt? Ut suscipit rerum ut perferendis nihil ea autem unde est enim veniam
            nam odio tempora.
          </p>

          <p>
            Quo numquam iste est repellendus numquam et galisum omnis ad praesentium dolores aut neque saepe vel
            consectetur enim aut cumque neque. Et voluptate sapiente quisquam quasi eum beatae voluptas rem iure velit.
            Sed impedit eaque 33 natus nihil est quaerat porro est quia nisi qui doloribus aperiam. Sit culpa illum ea
            consectetur perspiciatis ex veritatis dolorem id velit sequi qui maiores asperiores!
          </p>
          <p>
            Lorem ipsum dolor sit amet. Ut voluptas reiciendis vel praesentium laborum hic voluptas asperiores nam rerum
            nihil obcaecati labore. Id praesentium porro ea placeat rerum aut tempore totam aut illum cupiditate sed
            laborum explicabo. Hic explicabo voluptatibus qui repellat fugiat ex voluptatum fuga qui architecto atque
            quo illum quas aut facilis nesciunt? Ut suscipit rerum ut perferendis nihil ea autem unde est enim veniam
            nam odio tempora.
          </p>

          <p>
            Quo numquam iste est repellendus numquam et galisum omnis ad praesentium dolores aut neque saepe vel
            consectetur enim aut cumque neque. Et voluptate sapiente quisquam quasi eum beatae voluptas rem iure velit.
            Sed impedit eaque 33 natus nihil est quaerat porro est quia nisi qui doloribus aperiam. Sit culpa illum ea
            consectetur perspiciatis ex veritatis dolorem id velit sequi qui maiores asperiores!
          </p>
        </div>
      ),
    },
    {
      icon: ['fal', 'cog'],
      subItems: [
        {
          label: 'Label 1',
        },
        {
          label: 'Label 2',
        },
        {
          label: 'Label 3',
        },
        {
          label: 'Label 4',
        },
      ],
    },
    {
      icon: ['fal', 'user-circle'],
      subItems: [
        {
          label: 'Label 1',
        },
        {
          label: 'Label 2',
        },
        {
          label: 'Label 3',
        },
        {
          label: 'Label very very very very very very very very very very long',
        },
      ],
    },
  ],
};
