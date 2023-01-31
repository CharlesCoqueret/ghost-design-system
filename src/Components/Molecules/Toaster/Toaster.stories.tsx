import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { dismiss, error, errorPersistent, notify, success, Toaster as ToasterComponent } from './Toaster';
import { Button, ColorButtonEnum } from '../Button';
import Modal from '../../Atoms/Modal/Modal';
import ModalBody from '../../Atoms/Modal/ModalBody';
import ModalFooter from '../../Atoms/Modal/ModalFooter';
import { TextAreaField } from '../TextAreaField';
import Section from '../../Atoms/Layout/Section';

export default {
  title: 'Molecule',
  component: ToasterComponent,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof ToasterComponent>;

const Template: ComponentStory<typeof ToasterComponent> = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('Toast message');

  const closeModal = () => {
    setShow(false);
  };
  const openModal = () => {
    setShow(true);
  };

  return (
    <>
      <ToasterComponent />
      <Section title='Toast' collapsible={false}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridGap: '20px',
          }}>
          <Button label='Notify' onClick={() => notify(message)} />
          <Button label='Success' onClick={() => success(message)} />
          <Button label='Error' onClick={() => error(message)} />
          <Button label='Persistent error' onClick={() => errorPersistent(message)} />
          <Button label='Dismiss all toasts' onClick={() => dismiss()} />
        </div>
      </Section>

      <Section title='Toast message' collapsible={false}>
        <TextAreaField inputValue={message} onChange={setMessage} label='Toast' name='toast-message' />
      </Section>

      <Section title='With modal' collapsible={false}>
        <Button label='Open a modal to check compatibility' onClick={openModal} />
        <Modal title='Lorem ipsum' show={show} onHide={closeModal} closeIcon closeOnClickOutside>
          <ModalBody>
            <div>Lorem ipsum dolor sit amet.</div>
          </ModalBody>
          <ModalFooter>
            <Button color={ColorButtonEnum.PRIMARY} label='Ok' onClick={closeModal} />
          </ModalFooter>
        </Modal>
      </Section>
    </>
  );
};

export const Toaster = Template.bind({});
