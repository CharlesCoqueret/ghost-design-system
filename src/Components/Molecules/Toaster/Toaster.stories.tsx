import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import toast from './Toaster';
import { Button, ButtonColorEnum } from '../Button';
import Modal from '../../Atoms/Modal/Modal';
import ModalBody from '../../Atoms/Modal/ModalBody';
import ModalFooter from '../../Atoms/Modal/ModalFooter';
import { TextAreaField } from '../TextAreaField';
import Section from '../../Atoms/Layout/Section';

export default {
  title: 'Molecule/Toaster',
  component: toast.Toaster,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof toast.Toaster>;

const Template: ComponentStory<typeof toast.Toaster> = () => {
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
      <toast.Toaster />
      <Section title='Toast' collapsible={false}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridGap: '20px',
          }}>
          <Button label='Notify' onClick={() => toast.notify(message)} />
          <Button label='Success' onClick={() => toast.success(message)} />
          <Button label='Error' onClick={() => toast.error(message)} />
          <Button label='Persistent error' onClick={() => toast.errorPersistent(message)} />
          <Button label='Dismiss all toasts' onClick={() => toast.dismiss()} />
        </div>
      </Section>

      <Section title='Toast message' collapsible={false}>
        <TextAreaField input={message} onChange={setMessage} label='Toast' name='toast-message' />
      </Section>

      <Section title='With modal' collapsible={false}>
        <Button label='Open a modal to check compatibility' onClick={openModal} />
        <Modal title='Lorem ipsum' show={show} onHide={closeModal} closeIcon closeOnClickOutside>
          <ModalBody>
            <div>Lorem ipsum dolor sit amet.</div>
          </ModalBody>
          <ModalFooter>
            <Button color={ButtonColorEnum.PRIMARY} label='Ok' onClick={closeModal} />
          </ModalFooter>
        </Modal>
      </Section>
    </>
  );
};

export const Toaster = Template.bind({});
