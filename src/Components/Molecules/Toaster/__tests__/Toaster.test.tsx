import React from 'react';
import { dismiss, error, errorPersistent, notify, success, Toaster } from '..';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Use fake time for animation
jest.useFakeTimers();

beforeAll(() => {
  // ensure the window.matchMedia is responsive for Toaster
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

afterEach(() => {
  // dismiss all toaster
  dismiss();
  act(() => {
    // Run all timers to ensure all animations are over
    jest.runAllTimers();
  });
});

describe('Toaster Component', () => {
  it('Toaster contrainer renders', () => {
    const { container } = render(<Toaster />);
    expect(container).toMatchSnapshot();
  });

  it('Toaster renders notify without options  and clears', () => {
    const { container } = render(<Toaster />);
    act(() => {
      notify('NOTIFY');
    });

    expect(container).toMatchSnapshot();

    act(() => {
      dismiss();
    });

    act(() => {
      // Run all timers to ensure all animations are over
      jest.runAllTimers();
    });

    expect(container).toMatchSnapshot();
  });

  it('Toaster renders notify with options', () => {
    const { container } = render(<Toaster />);

    act(() => {
      notify('NOTIFY', { className: 'CLASSNAME' });
    });

    expect(container).toMatchSnapshot();
  });

  it('Toaster renders success without options', () => {
    const { container } = render(<Toaster />);

    act(() => {
      success('SUCCESS');
    });

    expect(container).toMatchSnapshot();
  });

  it('Toaster renders success with options', () => {
    const { container } = render(<Toaster />);

    act(() => {
      success('SUCCESS', { className: 'CLASSNAME' });
    });

    expect(container).toMatchSnapshot();
  });

  it('Toaster renders error without options', () => {
    const { container } = render(<Toaster />);

    act(() => {
      error('ERROR');
    });

    expect(container).toMatchSnapshot();
  });

  it('Toaster renders error with options', () => {
    const { container } = render(<Toaster />);

    act(() => {
      error('ERROR', { className: 'CLASSNAME' });
    });

    expect(container).toMatchSnapshot();
  });

  it('Toaster renders error persistant without options', () => {
    const { container } = render(<Toaster />);

    act(() => {
      errorPersistent('ERROR PERSISTENT');
    });

    expect(container).toMatchSnapshot();
  });

  it('Toaster renders error persistant with options', () => {
    const { container } = render(<Toaster />);

    act(() => {
      errorPersistent('ERROR PERSISTENT', { className: 'CLASSNAME' });
    });

    expect(container).toMatchSnapshot();
  });

  it('Toaster renders error persistant closes', async () => {
    const { container } = render(<Toaster />);

    act(() => {
      errorPersistent('ERROR PERSISTENT');
    });

    expect(container).toMatchSnapshot();

    const closeButton = await screen.findByRole('button');

    userEvent.click(closeButton);

    act(() => {
      // Run all timers to ensure all animations are over
      jest.runAllTimers();
    });

    expect(container).toMatchSnapshot();
  });
});
