import React from 'react';
import { render, act /*cleanup*/ } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Modal from '../Modal';

afterEach(() => {
  jest.useRealTimers();
});

describe('Modal Component', () => {
  it('Modal renders closed', async () => {
    const container = render(
      <Modal show={false}>
        <div id='CHILD1' />
      </Modal>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Modal renders open', async () => {
    const container = render(
      <Modal show title='MODALTITLE' size='sm'>
        <div id='CHILD1' />
      </Modal>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Modal renders handles close icon', async () => {
    const onHideMock = jest.fn();

    const container = render(
      <Modal show title='MODALTITLE' dataTestId={'TESTID'} size='lg' closeIcon onHide={onHideMock}>
        <div id='CHILD1' />
      </Modal>,
    );
    expect(container).toMatchSnapshot();

    const closeButton = await container.findByTestId('TESTID');

    userEvent.click(closeButton);
    expect(onHideMock).toHaveBeenCalledTimes(1);
  });

  it('Modal renders handles click outside', async () => {
    const onHideMock = jest.fn();

    const container = render(
      <Modal show closeOnClickOutside onHide={onHideMock}>
        <div id='CHILD1' />
      </Modal>,
    );
    expect(container).toMatchSnapshot();

    userEvent.click(document.body);
    expect(onHideMock).toHaveBeenCalledTimes(1);
  });

  it('Modal renders shakes when click outside when it is not allowed', async () => {
    const onHideMock = jest.fn();

    const container = render(
      <Modal show onHide={onHideMock}>
        <div id='CHILD1' />
      </Modal>,
    );
    expect(container).toMatchSnapshot();

    userEvent.click(document.body);
    expect(container).toMatchSnapshot();

    expect(onHideMock).toHaveBeenCalledTimes(0);
  });

  it('Modal renders handles press escape', async () => {
    const onHideMock = jest.fn();

    const container = render(
      <Modal show closeOnPressEscape onHide={onHideMock}>
        <div id='CHILD1' />
      </Modal>,
    );

    expect(container).toMatchSnapshot();

    userEvent.type(document.body, '{escape}');
    expect(onHideMock).toHaveBeenCalledTimes(1);
  });

  it('Modal renders shakes when press escape when it is not allowed', async () => {
    const onHideMock = jest.fn();
    jest.useFakeTimers();

    const container = render(
      <Modal show onHide={onHideMock}>
        <div id='CHILD1' />
      </Modal>,
    );
    expect(container).toMatchSnapshot();

    userEvent.type(document.body, '{escape}');
    expect(container).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });

    expect(container).toMatchSnapshot();
    expect(onHideMock).toHaveBeenCalledTimes(0);
  });

  it('Modal renders transition from open to close', async () => {
    const onHideMock = jest.fn();

    const { container, rerender } = render(
      <Modal show onHide={onHideMock}>
        <div id='CHILD1' />
      </Modal>,
    );
    expect(container).toMatchSnapshot();

    rerender(
      <Modal show={false} onHide={onHideMock}>
        <div id='CHILD1' />
      </Modal>,
    );
    expect(container).toMatchSnapshot();
  });
});
