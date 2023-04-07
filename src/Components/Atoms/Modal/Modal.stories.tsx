import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Modal, { IModalProps } from './Modal';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import { Button, ColorButtonEnum } from '../../Molecules/Button';

export default {
  title: 'Atom/Modal',
  component: Modal,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' }, layout: 'centered' },
  argTypes: {
    dataTestId: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args: IModalProps) => {
  const [show, setShow] = useState(false);

  const closeModal = () => {
    setShow(false);
  };
  const openModal = () => {
    setShow(true);
  };

  return (
    <>
      <Button label='Click to open the modal' onClick={openModal} />
      <Modal title='Lorem ipsum' {...args} show={show} onHide={closeModal}>
        <ModalBody>
          <div>Lorem ipsum dolor sit amet.</div>
        </ModalBody>
        <ModalFooter>
          <Button color={ColorButtonEnum.PRIMARY} label='Ok' onClick={closeModal} />
        </ModalFooter>
      </Modal>
    </>
  );
};

const TemplateScroll: ComponentStory<typeof Modal> = (args: IModalProps) => {
  const [show, setShow] = useState(false);

  const closeModal = () => {
    setShow(false);
  };
  const openModal = () => {
    setShow(true);
  };

  return (
    <>
      <div style={{ display: 'flex', height: '150vh', width: '150vw' }}>
        <div style={{ margin: 'auto' }}>
          <Button label='Click to open the modal' onClick={openModal} />
        </div>
        <Modal title='Lorem ipsum' {...args} show={show} onHide={closeModal}>
          <ModalBody>
            <p>
              Lorem ipsum dolor sit amet. Ut voluptas reiciendis vel praesentium laborum hic voluptas asperiores nam
              rerum nihil obcaecati labore. Id praesentium porro ea placeat rerum aut tempore totam aut illum cupiditate
              sed laborum explicabo. Hic explicabo voluptatibus qui repellat fugiat ex voluptatum fuga qui architecto
              atque quo illum quas aut facilis nesciunt? Ut suscipit rerum ut perferendis nihil ea autem unde est enim
              veniam nam odio tempora.
            </p>
            <p>
              Quo numquam iste est repellendus numquam et galisum omnis ad praesentium dolores aut neque saepe vel
              consectetur enim aut cumque neque. Et voluptate sapiente quisquam quasi eum beatae voluptas rem iure
              velit. Sed impedit eaque 33 natus nihil est quaerat porro est quia nisi qui doloribus aperiam. Sit culpa
              illum ea consectetur perspiciatis ex veritatis dolorem id velit sequi qui maiores asperiores!
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color={ColorButtonEnum.SECONDARY} label='cancel' onClick={closeModal} />
            <Button color={ColorButtonEnum.PRIMARY} label='Submit' onClick={closeModal} />
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  size: 'sm',
};

export const Scroll = TemplateScroll.bind({});
Scroll.args = {
  size: 'lg',
};
