import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import mdx from './Layout.mdx';
import RowComponent, { IRowProps } from './Row';
import Col from './Col';

export default {
  title: 'Atom/Layout',
  component: RowComponent,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    controls: { sort: 'requiredFirst' },
    docs: {
      page: mdx,
    },
  },
} as ComponentMeta<typeof RowComponent>;

const Template: ComponentStory<typeof RowComponent> = (args: IRowProps) => {
  return (
    <Col>
      {[1, 2, 3, 4].map((val) => (
        <RowComponent {...args} key={val}>{`Row #${val}`}</RowComponent>
      ))}
    </Col>
  );
};

export const Row = Template.bind({});
