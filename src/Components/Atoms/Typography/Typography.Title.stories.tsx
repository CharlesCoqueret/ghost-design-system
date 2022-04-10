import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Typography, { Title, ITitleProps } from './Typography';
import { Col, Container } from '../Layout';

export default {
  title: 'Atom/Typography/Title',
  component: Title,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (arg: ITitleProps) => {
  return (
    <Container>
      <Col>
        <Typography.Title level={1}>Typography.Title level 1</Typography.Title>
        <Typography.Title level={2}>Typography.Title level 2</Typography.Title>
        <Typography.Title level={3}>Typography.Title level 3</Typography.Title>
        <Typography.Title level={3}>Your own example here: </Typography.Title>
        <Typography.Title {...arg}>
          Lorem ipsum dolor sit amet. Ut voluptas reiciendis vel praesentium laborum hic voluptas asperiores nam rerum
          nihil obcaecati labore. Id praesentium porro ea placeat rerum aut tempore totam aut illum cupiditate sed
          laborum explicabo. Hic explicabo voluptatibus qui repellat fugiat ex voluptatum fuga qui architecto atque quo
          illum quas aut facilis nesciunt? Ut suscipit rerum ut perferendis nihil ea autem unde est enim veniam nam odio
          tempora. Quo numquam iste est repellendus numquam et galisum omnis ad praesentium dolores aut neque saepe vel
          consectetur enim aut cumque neque. Et voluptate sapiente quisquam quasi eum beatae voluptas rem iure velit.
          Sed impedit eaque 33 natus nihil est quaerat porro est quia nisi qui doloribus aperiam. Sit culpa illum ea
          consectetur perspiciatis ex veritatis dolorem id velit sequi qui maiores asperiores!
        </Typography.Title>
      </Col>
    </Container>
  );
};

export const Default = Template.bind({});
Default.args = {
  level: 3,
  ellipsis: true,
};
