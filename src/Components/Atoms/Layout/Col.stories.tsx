import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import mdx from './Layout.mdx';
import ColComponent, { IColProps } from './Col';
import Row from './Row';

export default {
  title: 'Atom/Layout',
  component: ColComponent,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    controls: { sort: 'requiredFirst' },
    docs: {
      page: mdx,
    },
  },
} as ComponentMeta<typeof ColComponent>;

const Template: ComponentStory<typeof ColComponent> = (args: IColProps) => {
  return (
    <Row>
      {[1, 2, 3, 4].map((val) => (
        <ColComponent {...args} key={val}>{`Col #${val}`}</ColComponent>
      ))}
    </Row>
  );
};

export const Col = Template.bind({});
