import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Col, { IColProps } from './Col';
import { AmountField, DatePickerField, TextAreaField, YearPickerField } from '../../Molecules';
import Container from './Container';
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
  title: 'Atom/Layout/Col',
  component: Col,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof Col>;

const Template: ComponentStory<typeof Col> = (args: IColProps) => {
  const [help, setHelp] = useState(false);

  return (
    <>
      <Container style={help ? { border: '2px dotted green' } : { border: '2px dotted transparent' }}>
        <Row>
          <Col
            {...args}
            style={
              help ? { ...args.style, border: '3px dotted red' } : { ...args.style, border: '3px dotted transparent' }
            }>
            <AmountField inputValue={initialData.amount} label='Amount' suffix='$' name='amount' readOnly />
          </Col>
          <Col
            {...args}
            style={
              help ? { ...args.style, border: '3px dotted red' } : { ...args.style, border: '3px dotted transparent' }
            }>
            <DatePickerField inputValue={initialData.date} label='Date' name='date' readOnly />
          </Col>
          <Col
            {...args}
            style={
              help ? { ...args.style, border: '3px dotted red' } : { ...args.style, border: '3px dotted transparent' }
            }>
            <TextAreaField inputValue={initialData.textarea} label='Textarea' name='textarea' readOnly />
          </Col>
          <Col
            {...args}
            style={
              help ? { ...args.style, border: '3px dotted red' } : { ...args.style, border: '3px dotted transparent' }
            }>
            <YearPickerField inputValue={initialData.year} label='Year' name='year' readOnly />
          </Col>
        </Row>
      </Container>
      <label>
        <input
          type='checkbox'
          checked={help}
          onChange={() => {
            setHelp((prev) => !prev);
          }}
        />
        Enable Helper
      </label>
      {help && (
        <>
          <p>Container in green</p>
          <p>Col in red</p>
        </>
      )}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
