import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import mdx from './Typography.mdx';
import TextComponent, { ITextProps, TextTypeEnum } from './Text';

export default {
  title: 'Atom/Typography',
  component: TextComponent,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    controls: { sort: 'requiredFirst' },
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    type: {
      options: Object.values(TextTypeEnum),
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof TextComponent>;

const Template: ComponentStory<typeof TextComponent> = (arg: ITextProps) => {
  return (
    <TextComponent {...arg}>
      Lorem ipsum dolor sit amet. Ut voluptas reiciendis vel praesentium laborum hic voluptas asperiores nam rerum nihil
      obcaecati labore. Id praesentium porro ea placeat rerum aut tempore totam aut illum cupiditate sed laborum
      explicabo. Hic explicabo voluptatibus qui repellat fugiat ex voluptatum fuga qui architecto atque quo illum quas
      aut facilis nesciunt? Ut suscipit rerum ut perferendis nihil ea autem unde est enim veniam nam odio tempora. Quo
      numquam iste est repellendus numquam et galisum omnis ad praesentium dolores aut neque saepe vel consectetur enim
      aut cumque neque. Et voluptate sapiente quisquam quasi eum beatae voluptas rem iure velit. Sed impedit eaque 33
      natus nihil est quaerat porro est quia nisi qui doloribus aperiam. Sit culpa illum ea consectetur perspiciatis ex
      veritatis dolorem id velit sequi qui maiores asperiores!
    </TextComponent>
  );
};

export const Text = Template.bind({});
Text.args = { ellipsis: true };
