import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AmountInput } from '..';
import { ThousandsGroupStyle } from '../AmountInput';

describe('AmountInput Component', () => {
  it('AmountInput renders', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(<AmountInput name='name' dataTestId='name' onChange={onChangeMock} />);
    expect(onChangeMock).toBeCalledTimes(0);

    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders in readonly with no value, highlighted', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <AmountInput highlighted name='name' ellipsis onChange={onChangeMock} prefix='A' readOnly suffix='B' />,
    );
    expect(onChangeMock).toBeCalledTimes(0);

    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders in readonly with value shotern', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <AmountInput
        highlighted
        inputValue={1234567890.12}
        name='name'
        onChange={onChangeMock}
        prefix='A'
        readOnly
        suffix='B'
        thousandsGroupStyle={ThousandsGroupStyle.SHORTEN}
      />,
    );
    expect(onChangeMock).toBeCalledTimes(0);

    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders in readonly with value LAKH fornat', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <AmountInput
        highlighted
        inputValue={1234567890.12}
        name='name'
        onChange={onChangeMock}
        prefix='A'
        readOnly
        suffix='B'
        thousandsGroupStyle={ThousandsGroupStyle.LAKH}
      />,
    );
    expect(onChangeMock).toBeCalledTimes(0);

    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders in readonly with value LAKH fornat without prefix and suffix', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <AmountInput
        highlighted
        inputValue={1234567890.12}
        name='name'
        onChange={onChangeMock}
        readOnly
        thousandsGroupStyle={ThousandsGroupStyle.LAKH}
      />,
    );
    expect(onChangeMock).toBeCalledTimes(0);

    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders triggers onChange', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <AmountInput
        name='name'
        dataTestId='name'
        maxValue={9999999999}
        minValue={-10}
        onChange={onChangeMock}
        prefix='A'
        suffix='B'
      />,
    );

    const input = screen.getByTestId('name');

    userEvent.type(input, '123456789');

    expect(onChangeMock).toBeCalledTimes(9);
    expect(onChangeMock).toHaveBeenLastCalledWith(123456789);
    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders triggers onChange with min and max', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <AmountInput name='name' dataTestId='name' maxValue={100} minValue={-100} onChange={onChangeMock} />,
    );

    const input = screen.getByTestId('name');

    userEvent.type(input, '123');

    expect(onChangeMock).toBeCalledTimes(2);
    expect(onChangeMock).toHaveBeenLastCalledWith(12);
    expect(container).toMatchSnapshot();

    userEvent.clear(input);
    userEvent.type(input, '-123');
    expect(onChangeMock).toBeCalledTimes(6);
    expect(onChangeMock).toHaveBeenLastCalledWith(-12);
    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders with empty input in read only', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(<AmountInput name='name' dataTestId='name' onChange={onChangeMock} readOnly />);

    const input = screen.getByTestId('name');
    userEvent.type(input, '123456789');
    expect(onChangeMock).toBeCalledTimes(0);
    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders groupint style NONE', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <AmountInput name='name' onChange={onChangeMock} thousandsGroupStyle={ThousandsGroupStyle.NONE} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders with empty input in read only prefix and suffix', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <AmountInput name='name' dataTestId='name' onChange={onChangeMock} prefix='A' suffix='B' readOnly />,
    );

    const input = screen.getByTestId('name');
    userEvent.type(input, '123456789');
    expect(onChangeMock).toBeCalledTimes(0);
    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders with empty input in read only prefix and suffix shorten', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <AmountInput
        name='name'
        onChange={onChangeMock}
        dataTestId='name'
        inputValue='10'
        prefix='A'
        suffix='B'
        readOnly
      />,
    );

    const input = screen.getByTestId('name');
    userEvent.type(input, '123456789');
    expect(onChangeMock).toBeCalledTimes(0);
    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders with empty input in read only prefix and suffix shorten', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <AmountInput
        name='name'
        onChange={onChangeMock}
        dataTestId='name'
        inputValue='10'
        prefix='A'
        suffix='B'
        readOnly
      />,
    );

    const input = screen.getByTestId('name');
    userEvent.type(input, '123456789');
    expect(onChangeMock).toBeCalledTimes(0);
    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders with in read only shorten highlighted prefix and suffix shorten', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <AmountInput
        name='name'
        dataTestId='name'
        onChange={onChangeMock}
        thousandsGroupStyle={ThousandsGroupStyle.SHORTEN}
        inputValue='1234567890.1234'
        prefix='A'
        highlighted
        suffix='B'
        readOnly={true}
      />,
    );

    const input = screen.getByTestId('name');
    userEvent.type(input, '123456789');
    expect(onChangeMock).toBeCalledTimes(0);
    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders with input in readonly highlighted shorten', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <AmountInput
        name='name'
        dataTestId='name'
        onChange={onChangeMock}
        thousandsGroupStyle={ThousandsGroupStyle.SHORTEN}
        inputValue='1234567890.1234'
        readOnly={true}
        highlighted
      />,
    );

    const input = screen.getByTestId('name');
    userEvent.type(input, '123456789');
    expect(onChangeMock).toBeCalledTimes(0);
    expect(container).toMatchSnapshot();
  });
});
