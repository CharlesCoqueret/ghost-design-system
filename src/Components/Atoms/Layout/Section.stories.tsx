import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import mdx from './Layout.mdx';
import SectionComponent, { ISectionProps } from './Section';

export default {
  title: 'Atom/Layout',
  component: SectionComponent,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    controls: { sort: 'requiredFirst' },
    docs: {
      page: mdx,
    },
  },
} as ComponentMeta<typeof SectionComponent>;

const Template: ComponentStory<typeof SectionComponent> = (args: ISectionProps) => {
  return (
    <>
      <SectionComponent {...args}>
        <p>Paragraph inside a section</p>
        <p>Paragraph inside a section</p>
      </SectionComponent>
      <SectionComponent title='Section initially closed' openInitially={false}>
        <p>Paragraph inside a section</p>
        <p>Paragraph inside a section</p>
      </SectionComponent>
      <SectionComponent title='Section not collapsible' collapsible={false}>
        <p>Paragraph inside a section</p>
        <p>Paragraph inside a section</p>
      </SectionComponent>
      <SectionComponent title='Section without separator' separator={false}>
        <p>Paragraph inside a section</p>
        <p>Paragraph inside a section</p>
      </SectionComponent>
    </>
  );
};

export const Section = Template.bind({});
Section.args = {
  title: 'Section title',
  level: 2,
};
