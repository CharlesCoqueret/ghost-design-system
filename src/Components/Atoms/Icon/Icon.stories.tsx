import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import IconComponent from './Icon';

export default {
  title: 'Atom',
  component: IconComponent,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof IconComponent>;

const Template: ComponentStory<typeof IconComponent> = (args: FontAwesomeIconProps) => {
  const iconList: Array<IconProp> = [
    ['fal', 'arrow-down-to-line'],
    ['fal', 'arrow-left'],
    ['fal', 'arrow-up-from-line'],
    ['fal', 'arrows-left-right-to-line'],
    ['fal', 'arrows-to-line'],
    ['fal', 'ballot-check'],
    ['fal', 'bell'],
    ['fal', 'briefcase'],
    ['fal', 'calendar-day'],
    ['fal', 'chart-column'],
    ['fal', 'check'],
    ['fal', 'chevron-down'],
    ['fal', 'chevron-left'],
    ['fal', 'chevron-right'],
    ['fal', 'columns-3'],
    ['fal', 'ellipsis'],
    ['fal', 'exclamation-triangle'],
    ['fal', 'external-link'],
    ['fal', 'eye'],
    ['fal', 'file-alt'],
    ['fal', 'filter'],
    ['fal', 'gear'],
    ['fal', 'highlighter'],
    ['fal', 'inbox'],
    ['fal', 'info-circle'],
    ['fal', 'list-ol'],
    ['fal', 'list-ul'],
    ['fal', 'loader'],
    ['fal', 'long-arrow-alt-down'],
    ['fal', 'long-arrow-alt-left'],
    ['fal', 'long-arrow-alt-up'],
    ['fal', 'magnifying-glass'],
    ['fal', 'message-exclamation'],
    ['fal', 'minus'],
    ['fal', 'paperclip'],
    ['fal', 'paper-plane'],
    ['fal', 'pen'],
    ['fal', 'pipe'],
    ['fal', 'plus'],
    ['fal', 'question-circle'],
    ['fal', 'save'],
    ['fal', 'scale-balanced'],
    ['fal', 'spinner'],
    ['fal', 'square'],
    ['fal', 'table'],
    ['fal', 'text-size'],
    ['fal', 'times'],
    ['fal', 'times-circle'],
    ['fal', 'trash-alt'],
    ['fal', 'undo'],
    ['fal', 'user-circle'],
    ['fal', 'user-lock'],
    ['fal', 'user-unlock'],
    ['fal', 'window-maximize'],
    ['far', 'bold'],
    ['far', 'horizontal-rule'],
    ['far', 'image'],
    ['far', 'indent'],
    ['far', 'italic'],
    ['far', 'link'],
    ['far', 'outdent'],
    ['far', 'palette'],
    ['far', 'strikethrough'],
    ['far', 'underline'],
    ['fas', 'caret-down'],
    ['fas', 'sort'],
    ['fas', 'sort-down'],
    ['fas', 'sort-up'],
    ['fas', 'square'],
    ['fas', 'square-check'],
  ];

  return (
    <>
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-around' }}>
        <IconComponent {...args} />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridGap: '20px',
          gridAutoRows: 'minmax(100px, auto)',
        }}>
        {iconList.map((icon) => {
          return (
            <div key={icon.toString()} style={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
              <IconComponent icon={icon} size='2x' />
              <div style={{ fontWeight: '400', fontSize: '14px', margin: '10px auto' }}>{`${icon[0]} ${icon[1]}`}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export const Icon = Template.bind({});
Icon.args = {
  icon: ['fal', 'arrow-down-to-line'] as IconProp,
  size: '3x' as SizeProp,
  color: 'red',
  spin: false,
  spinPulse: false,
  spinReverse: false,
  pulse: true,
  title: 'title',
};
