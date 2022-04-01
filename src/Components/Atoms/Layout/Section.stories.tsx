import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Section, { ISectionProps } from './Section';
import { AmountField, DatePickerField, TextAreaField, YearPickerField } from '../../Molecules';

const initialData = {
  amount: 100000,
  date: new Date(),
  textarea:
    'Lorem ipsum dolor sit amet. Ut voluptas reiciendis vel praesentium laborum hic voluptas asperiores nam ' +
    'rerum nihil obcaecati labore. Id praesentium porro ea placeat rerum aut tempore totam aut illum cupiditate sed ' +
    'laborum explicabo. Hic explicabo voluptatibus qui repellat fugiat ex voluptatum fuga qui architecto atque quo ' +
    'illum quas aut facilis nesciunt? Ut suscipit rerum ut perferendis nihil ea autem unde est enim veniam nam odio ' +
    'tempora.\n\nQuo numquam iste est repellendus numquam et galisum omnis ad praesentium dolores aut neque saepe ' +
    'vel consectetur enim aut cumque neque. Et voluptate sapiente quisquam quasi eum beatae voluptas rem iure velit. ' +
    'Sed impedit eaque 33 natus nihil est quaerat porro est quia nisi qui doloribus aperiam. Sit culpa illum ea ' +
    'consectetur perspiciatis ex veritatis dolorem id velit sequi qui maiores asperiores!',
  year: 1984,
};

export default {
  title: 'Atom/Layout/Section',
  component: Section,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof Section>;

const Template: ComponentStory<typeof Section> = (args: ISectionProps) => {
  return (
    <Section {...args}>
      <AmountField inputValue={initialData.amount} label='Amount' suffix='$' name='amount' readOnly />
      <DatePickerField inputValue={initialData.date} label='Date' name='date' readOnly />
      <TextAreaField inputValue={initialData.textarea} label='Textarea' name='textarea' readOnly />
      <YearPickerField inputValue={initialData.year} label='Year' name='year' readOnly />
    </Section>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  openInitially: true,
};
