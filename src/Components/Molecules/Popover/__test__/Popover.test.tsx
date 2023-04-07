import React, { ReactElement, useRef } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Popover from '../Popover';
jest.unmock('@szhsin/react-menu');

// Creating wrapper component to be able to access useRef
const MockComponent = ({ onCloseMock, open }: { onCloseMock: () => void; open: boolean }): ReactElement => {
  const ref = useRef(null);
  return (
    <>
      <div ref={ref} />
      <Popover anchorRef={ref} buttons={[]} onClose={onCloseMock} open={open} title='' />
    </>
  );
};

afterAll(() => {
  jest.resetAllMocks();
});

describe('Popover Component', () => {
  it('Popover renders', () => {
    const onCloseMock = jest.fn();
    const { baseElement, rerender } = render(<MockComponent onCloseMock={onCloseMock} open={false} />);

    expect(baseElement).toMatchSnapshot();

    rerender(<MockComponent onCloseMock={onCloseMock} open={true} />);
    expect(baseElement).toMatchSnapshot();

    userEvent.click(document.body);
    expect(onCloseMock).toBeCalledTimes(1);
  });
});
