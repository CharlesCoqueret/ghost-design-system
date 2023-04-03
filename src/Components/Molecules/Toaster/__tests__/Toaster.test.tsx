import React from 'react';
import toast from '../Toaster';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Toaster Component', () => {
  beforeAll(() => {
    // Use fake time for animation
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      // Dismiss all toaster
      toast.dismiss();

      // Run all timers to ensure all animations are over
      jest.runAllTimers();
    });
  });

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

    act(() => {
      userEvent.click(closeButton);

      // Run all timers to ensure all animations are over
      jest.runAllTimers();
    });

    expect(container).toMatchSnapshot();
  });
});
