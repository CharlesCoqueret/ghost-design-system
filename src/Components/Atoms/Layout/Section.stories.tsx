import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SectionComponent, { ISectionProps } from './Section';
import { AmountField, DatePickerField, TextAreaField, YearPickerField } from '../../Molecules';
import Row from './Row';
import Container from './Container';
import Col from './Col';

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
  component: SectionComponent,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof SectionComponent>;

const Template: ComponentStory<typeof SectionComponent> = (args: ISectionProps) => {
  const [val, setval] = useState(initialData.textarea);
  return (
    <SectionComponent {...args}>
      <Container>
        <Col>
          <Row>
            <AmountField inputValue={initialData.amount} label='Amount' suffix='$' name='amount' readOnly />
          </Row>
          <Row>
            <DatePickerField inputValue={initialData.date} label='Date' name='date' readOnly />
          </Row>
          <Row>
            <TextAreaField inputValue={val} label='Textarea' name='textarea' onChange={setval} />
          </Row>
          <Row>
            <YearPickerField inputValue={initialData.year} label='Year' name='year' readOnly />
          </Row>
        </Col>
      </Container>
    </SectionComponent>
  );
};

export const Section = Template.bind({});
Section.args = {
  title: 'Title',
  openInitially: true,
};
