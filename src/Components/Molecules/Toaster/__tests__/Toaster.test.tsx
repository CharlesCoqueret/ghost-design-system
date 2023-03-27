import React from 'react';
import toast from '../Toaster';
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
  toast.dismiss();
  act(() => {
    // Run all timers to ensure all animations are over
    jest.runAllTimers();
  });
});

describe('Toaster Component', () => {
  it('Toaster contrainer renders', () => {
    const { container } = render(<toast.Toaster />);
    expect(container).toMatchSnapshot();
  });

  it('Toaster renders notify without options  and clears', () => {
    const { container } = render(<toast.Toaster />);
    act(() => {
      toast.notify('NOTIFY');
    });

    expect(container).toMatchSnapshot();

    act(() => {
      toast.dismiss();
    });

    act(() => {
      // Run all timers to ensure all animations are over
      jest.runAllTimers();
    });

    expect(container).toMatchSnapshot();
  });

  it('Toaster renders notify with options', () => {
    const { container } = render(<toast.Toaster />);

    act(() => {
      toast.notify('NOTIFY', { className: 'CLASSNAME' });
    });

    expect(container).toMatchSnapshot();
  });

  it('Toaster renders success without options', () => {
    const { container } = render(<toast.Toaster />);

    act(() => {
      toast.success('SUCCESS');
    });

    expect(container).toMatchSnapshot();
  });

  it('Toaster renders success with options', () => {
    const { container } = render(<toast.Toaster />);

    act(() => {
      toast.success('SUCCESS', { className: 'CLASSNAME' });
    });

    expect(container).toMatchSnapshot();
  });

  it('Toaster renders error without options', () => {
    const { container } = render(<toast.Toaster />);

    act(() => {
      toast.error('ERROR');
    });

    expect(container).toMatchSnapshot();
  });

  it('Toaster renders error with options', () => {
    const { container } = render(<toast.Toaster />);

    act(() => {
      toast.error('ERROR', { className: 'CLASSNAME' });
    });

    expect(container).toMatchSnapshot();
  });

  it('Toaster renders error persistant without options', () => {
    const { container } = render(<toast.Toaster />);

    act(() => {
      toast.errorPersistent('ERROR PERSISTENT');
    });

    expect(container).toMatchSnapshot();
  });

  it('Toaster renders error persistant with options', () => {
    const { container } = render(<toast.Toaster />);

    act(() => {
      toast.errorPersistent('ERROR PERSISTENT', { className: 'CLASSNAME' });
    });

    expect(container).toMatchSnapshot();
  });

  it('Toaster renders error persistant closes', async () => {
    const { container } = render(<toast.Toaster />);

    act(() => {
      toast.errorPersistent('ERROR PERSISTENT');
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
