import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Typography, { Text, ITextProps, TextTypeEnum } from './Typography';
import { Col, Container, Section } from '../Layout';

export default {
  title: 'Atom/Typography/Text',
  component: Text,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (arg: ITextProps) => {
  return (
    <Container>
      <Col>
        <Typography.Text type={TextTypeEnum.BODY}>Typography.Text type: body</Typography.Text>
        <Typography.Text type={TextTypeEnum.ERROR}>Typography.Text type: error</Typography.Text>
        <Typography.Text type={TextTypeEnum.HELPER}>Typography.Text type: helper</Typography.Text>
        <Typography.Text type={TextTypeEnum.LABEL}>Typography.Text type: label</Typography.Text>
        <Typography.Text type={TextTypeEnum.PLACEHOLDER}>Typography.Text type: placeholder</Typography.Text>
        <Typography.Text type={TextTypeEnum.TINY}>Typography.Text type: tiny</Typography.Text>
        <Typography.Text type={TextTypeEnum.HIGHLIGHTED}>Typography.Text type: highlighted</Typography.Text>
        <Typography.Text type={TextTypeEnum.DISABLED}>Typography.Text type: disabled</Typography.Text>
        <Section title='Your own example here:' collapsible={false} separator={false}>
          <Typography.Text {...arg}>
            Your own example here: Lorem ipsum dolor sit amet. Ut voluptas reiciendis vel praesentium laborum hic
            voluptas asperiores nam rerum nihil obcaecati labore. Id praesentium porro ea placeat rerum aut tempore
            totam aut illum cupiditate sed laborum explicabo. Hic explicabo voluptatibus qui repellat fugiat ex
            voluptatum fuga qui architecto atque quo illum quas aut facilis nesciunt? Ut suscipit rerum ut perferendis
            nihil ea autem unde est enim veniam nam odio tempora. Quo numquam iste est repellendus numquam et galisum
            omnis ad praesentium dolores aut neque saepe vel consectetur enim aut cumque neque. Et voluptate sapiente
            quisquam quasi eum beatae voluptas rem iure velit. Sed impedit eaque 33 natus nihil est quaerat porro est
            quia nisi qui doloribus aperiam. Sit culpa illum ea consectetur perspiciatis ex veritatis dolorem id velit
            sequi qui maiores asperiores!
          </Typography.Text>
        </Section>
      </Col>
    </Container>
  );
};

export const Default = Template.bind({});
Default.args = {
  type: TextTypeEnum.PLACEHOLDER,
  ellipsis: true,
};
