import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ColComponent, { IColProps } from './Col';
import { AmountField, DatePickerField, TextAreaField, YearPickerField } from '../../Molecules';
import Row from './Row';

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
  title: 'Atom/Layout',
  component: ColComponent,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof ColComponent>;

const Template: ComponentStory<typeof ColComponent> = (args: IColProps) => {
  return (
    <Row>
      <ColComponent {...args}>
        <AmountField inputValue={initialData.amount} label='Amount' suffix='$' readOnly />
      </ColComponent>
      <ColComponent {...args}>
        <DatePickerField inputValue={initialData.date} label='Date' readOnly />
      </ColComponent>
      <ColComponent {...args}>
        <TextAreaField inputValue={initialData.textarea} label='Textarea' readOnly />
      </ColComponent>
      <ColComponent {...args}>
        <YearPickerField inputValue={initialData.year} label='Year' readOnly />
      </ColComponent>
    </Row>
  );
};

export const Col = Template.bind({});
Col.args = {};
