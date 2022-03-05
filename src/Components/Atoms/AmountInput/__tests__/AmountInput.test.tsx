import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AmountInput } from '..';
import { ThousandsGroupStyle } from '../AmountInput';

describe('AmountInput Component', () => {
  it('AmountInput renders with input', async () => {
    const onChangeMock = jest.fn();

    const container = render(<AmountInput name='name' onChange={onChangeMock} />);
    expect(onChangeMock).toBeCalledTimes(0);

    expect(container).toMatchSnapshot();
  });

  it('CheckboxInput renders triggers onChange', async () => {
    const onChangeMock = jest.fn();

    const container = render(<AmountInput name='name' onChange={onChangeMock} />);

    const input = container.getByTestId('name');

    userEvent.type(input, '123456789');

    expect(onChangeMock).toBeCalledTimes(9);
    expect(onChangeMock).toHaveBeenLastCalledWith(123456789);
    expect(container).toMatchSnapshot();
  });

  it('CheckboxInput renders with empty input in read only', async () => {
    const onChangeMock = jest.fn();

    const container = render(<AmountInput name='name' onChange={onChangeMock} readOnly />);

    const input = container.getByTestId('name');
    userEvent.type(input, '123456789');
    expect(onChangeMock).toBeCalledTimes(0);
    expect(container).toMatchSnapshot();
  });

  it('CheckboxInput renders with empty input in read only prefix and suffix', async () => {
    const onChangeMock = jest.fn();

    const container = render(<AmountInput name='name' onChange={onChangeMock} prefix='A' suffix='B' readOnly />);

    const input = container.getByTestId('name');
    userEvent.type(input, '123456789');
    expect(onChangeMock).toBeCalledTimes(0);
    expect(container).toMatchSnapshot();
  });

  it('CheckboxInput renders with empty input in read only prefix and suffix shorten', async () => {
    const onChangeMock = jest.fn();

    const container = render(
      <AmountInput name='name' onChange={onChangeMock} inputValue='10' prefix='A' suffix='B' readOnly />,
    );

    const input = container.getByTestId('name');
    userEvent.type(input, '123456789');
    expect(onChangeMock).toBeCalledTimes(0);
    expect(container).toMatchSnapshot();
  });

  it('CheckboxInput renders with empty input in read only prefix and suffix shorten', async () => {
    const onChangeMock = jest.fn();

    const container = render(
      <AmountInput name='name' onChange={onChangeMock} inputValue='10' prefix='A' suffix='B' readOnly />,
    );

    const input = container.getByTestId('name');
    userEvent.type(input, '123456789');
    expect(onChangeMock).toBeCalledTimes(0);
    expect(container).toMatchSnapshot();
  });

  it('CheckboxInput renders with in read only shorten highlighted prefix and suffix shorten', async () => {
    const onChangeMock = jest.fn();

    const container = render(
      <AmountInput
        name='name'
        onChange={onChangeMock}
        thousandsGroupStyle={ThousandsGroupStyle.SHORTEN}
        inputValue='1234567890.1234'
        prefix='A'
        highlighted
        suffix='B'
        readOnly={true}
      />,
    );

    const input = container.getByTestId('name');
    userEvent.type(input, '123456789');
    expect(onChangeMock).toBeCalledTimes(0);
    expect(container).toMatchSnapshot();
  });

  it('CheckboxInput renders with input in readonly highlighted shorten', async () => {
    const onChangeMock = jest.fn();

    const container = render(
      <AmountInput
        name='name'
        onChange={onChangeMock}
        thousandsGroupStyle={ThousandsGroupStyle.SHORTEN}
        inputValue='1234567890.1234'
        readOnly={true}
        highlighted
      />,
    );

    const input = container.getByTestId('name');
    userEvent.type(input, '123456789');
    expect(onChangeMock).toBeCalledTimes(0);
    expect(container).toMatchSnapshot();
  });
});
