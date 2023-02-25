import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Modal from '../Modal';

afterEach(() => {
  jest.useRealTimers();
});

describe('Modal Component', () => {
  it('Modal renders closed', () => {
    const { container } = render(
      <Modal show={false}>
        <div id='CHILD1' />
      </Modal>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Modal renders open', () => {
    const { container } = render(
      <Modal show title='MODALTITLE' size='sm'>
        <div id='CHILD1' />
      </Modal>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Modal renders handles close icon', async () => {
    const onHideMock = jest.fn();

    const { container } = render(
      <Modal show title='MODALTITLE' dataTestId={'TESTID'} size='lg' closeIcon onHide={onHideMock}>
        <div id='CHILD1' />
      </Modal>,
    );
    expect(container).toMatchSnapshot();

    const closeButton = await screen.findByTestId('TESTID');

    act(() => {
      userEvent.click(closeButton);
    });

    expect(onHideMock).toHaveBeenCalledTimes(1);
  });

  it('Modal renders handles click outside', () => {
    const onHideMock = jest.fn();

    const { container } = render(
      <Modal show closeOnClickOutside onHide={onHideMock}>
        <div id='CHILD1' />
      </Modal>,
    );
    expect(container).toMatchSnapshot();

    act(() => {
      userEvent.click(document.body);
    });

    expect(onHideMock).toHaveBeenCalledTimes(1);
  });

  it('Modal renders shakes when click outside when it is not allowed', () => {
    const onHideMock = jest.fn();

    const { container } = render(
      <Modal show onHide={onHideMock}>
        <div id='CHILD1' />
      </Modal>,
    );
    expect(container).toMatchSnapshot();

    act(() => {
      userEvent.click(document.body);
    });

    expect(container).toMatchSnapshot();

    expect(onHideMock).toHaveBeenCalledTimes(0);
  });

  it('Modal renders handles press escape', () => {
    const onHideMock = jest.fn();

    const { container } = render(
      <Modal show closeOnPressEscape onHide={onHideMock}>
        <div id='CHILD1' />
      </Modal>,
    );

    expect(container).toMatchSnapshot();

    act(() => {
      userEvent.type(document.body, '{escape}');
    });

    expect(onHideMock).toHaveBeenCalledTimes(1);
  });

  it('Modal renders shakes when press escape when it is not allowed', () => {
    const onHideMock = jest.fn();
    jest.useFakeTimers();

    const { container } = render(
      <Modal show onHide={onHideMock}>
        <div id='CHILD1' />
      </Modal>,
    );
    expect(container).toMatchSnapshot();

    act(() => {
      userEvent.type(document.body, '{escape}');
    });

    expect(container).toMatchSnapshot();

    act(() => {
      jest.runAllTimers();
    });

    expect(container).toMatchSnapshot();
    expect(onHideMock).toHaveBeenCalledTimes(0);
  });

  it('Modal renders transition from open to close', () => {
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

  it('Modal renders handles tabbing', async () => {
    const onHideMock = jest.fn();

    const { container, rerender } = render(
      <Modal show={false} title='MODALTITLE' dataTestId={'TESTID'} size='lg' closeIcon onHide={onHideMock}>
        <input data-testId='INPUT' />
      </Modal>,
    );
    expect(container).toMatchSnapshot();

    rerender(
      <Modal show={true} title='MODALTITLE' dataTestId={'TESTID'} size='lg' closeIcon onHide={onHideMock}>
        <input data-testid='INPUT' />
      </Modal>,
    );
    expect(container).toMatchSnapshot();

    // Try to tab forward
    userEvent.keyboard('{Tab}');

    // Try to tab backward
    userEvent.keyboard('{Shift>}{Tab}{/Shift}');

    const input = screen.getByTestId('INPUT');

    act(() => {
      userEvent.click(input);
    });

    // Try to tab forward
    userEvent.keyboard('{Tab}');

    act(() => {
      userEvent.click(input);
    });

    // Try to tab backward
    userEvent.keyboard('{Shift>}{Tab}{/Shift}');

    expect(container).toMatchSnapshot();
  });
});
