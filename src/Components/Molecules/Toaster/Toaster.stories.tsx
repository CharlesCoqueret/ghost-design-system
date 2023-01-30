import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { error, errorPersistent, notify, success, Toaster } from './Toaster';
import { Button, ColorButtonEnum } from '../Button';
import Modal from '../../Atoms/Modal/Modal';
import ModalBody from '../../Atoms/Modal/ModalBody';
import ModalFooter from '../../Atoms/Modal/ModalFooter';
import { TextAreaField } from '../TextAreaField';

export default {
    title: 'Molecule/Toaster',
    component: Toaster,
    parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof Toaster>;

const Template: ComponentStory<typeof Toaster> = () => {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('Toast message');

    const closeModal = () => {
        setShow(false);
    };
    const openModal = () => {
        setShow(true);
    };

    return (
        <div>
            <div style={{ margin: '5px' }}>
                <TextAreaField
                    inputValue={message}
                    onChange={setMessage}
                    label="Change message to toast"
                    name="toast-message"
                />
            </div>

            <div style={{ margin: '5px' }}>
                <Button label="Open a modal to check compatibility" onClick={openModal} />
                <Modal title="Lorem ipsum" show={show} onHide={closeModal} closeIcon>
                    <ModalBody>
                        <div>Lorem ipsum dolor sit amet.</div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color={ColorButtonEnum.PRIMARY} label="Ok" onClick={closeModal} />
                    </ModalFooter>
                </Modal>
            </div>

            <b>Toasts</b>
            <div
                style={{
                    margin: '5px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gridGap: '20px',
                    gridAutoRows: 'minmax(50px, auto)',
                }}>
                <Toaster />
                <Button label="Notify" onClick={() => notify(message)} />
                <Button label="Success" onClick={() => success(message)} />
                <Button label="Error" onClick={() => error(message)} />
                <Button label="Persistent error" onClick={() => errorPersistent(message)} />
            </div>
        </div>
    );
};

export const Default = Template.bind({});
