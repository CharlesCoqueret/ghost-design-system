import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PercentageField } from '..';

describe('PercentageField Component', () => {
  it('PercentageField renders', () => {
    const { container } = render(<PercentageField name='name' />);
    expect(container).toMatchSnapshot();
  });

  it('PercentageField renders with values in readonly', () => {
    const { container } = render(<PercentageField input={12.34} name='name' readOnly />);
    expect(container).toMatchSnapshot();
  });

  it('PercentageField renders with values in disabled highligted', () => {
    const { container } = render(<PercentageField input={12345.67} name='name' disabled highlighted />);
    expect(container).toMatchSnapshot();
  });

  it('PercentageField renders with values with fieldSize and inline', () => {
    const { container } = render(<PercentageField input={1.23} name='name' inline fieldSize={6} />);
    expect(container).toMatchSnapshot();
  });

  it('PercentageField renders with values set as string', () => {
    const { container } = render(<PercentageField input={'1.23'} name='name' />);
    expect(container).toMatchSnapshot();
  });

  it('PercentageField renders with values set as undefined', () => {
    const { container } = render(<PercentageField input={undefined} name='name' />);
    expect(container).toMatchSnapshot();
  });

  it('PercentageField does nothing when onChange is not defined', () => {
    const { container } = render(<PercentageField input={1.23} name='name' dataTestId='DATA-TEST-ID' />);
    expect(container).toMatchSnapshot();

    const inputNode = screen.getByTestId('DATA-TEST-ID');

    userEvent.type(inputNode, '{backspace}');

    expect(container).toMatchSnapshot();
  });

  it('PercentageField handles change', () => {
    const onChangeMock = jest.fn().mockImplementation(() => {});

    const { container } = render(
      <PercentageField input={1.23} name='name' onChange={onChangeMock} dataTestId='DATA-TEST-ID' />,
    );
    expect(container).toMatchSnapshot();

    const inputNode = screen.getByTestId('DATA-TEST-ID');

    userEvent.type(inputNode, '{backspace}');

    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toHaveBeenLastCalledWith(0.12);
    expect(container).toMatchSnapshot();
  });
});
