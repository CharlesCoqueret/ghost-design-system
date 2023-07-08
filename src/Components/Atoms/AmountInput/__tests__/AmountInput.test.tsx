import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AmountInput } from '..';
import { ThousandsGroupStyle } from '../AmountInput';

describe('AmountInput Component', () => {
  it('AmountInput renders', () => {
    const onChangeMock = jest.fn();

    const { container } = render(<AmountInput dataTestId='name' onChange={onChangeMock} />);
    expect(onChangeMock).toBeCalledTimes(0);

    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders in readonly with no value, highlighted', () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <AmountInput highlighted ellipsis onChange={onChangeMock} prefix='A' readOnly suffix='B' />,
    );
    expect(onChangeMock).toBeCalledTimes(0);

    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders in readonly with value shotern', () => {
    const onChangeMock = jest.fn();

    const { container, rerender } = render(
      <AmountInput
        highlighted
        input={1234567890.12}
        onChange={onChangeMock}
        prefix='A'
        readOnly
        suffix='B'
        thousandsGroupStyle={ThousandsGroupStyle.SHORTEN}
      />,
    );
    expect(onChangeMock).toBeCalledTimes(0);

    expect(container).toMatchSnapshot();

    rerender(
      <AmountInput
        decimalScale={2}
        highlighted
        input={1234567890.12}
        onChange={onChangeMock}
        prefix='A'
        readOnly
        suffix='B'
        thousandsGroupStyle={ThousandsGroupStyle.SHORTEN}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders in readonly with value LAKH fornat', () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <AmountInput
        highlighted
        input={1234567890.12}
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

  it('AmountInput renders in readonly with value LAKH fornat without prefix and suffix', () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <AmountInput
        highlighted
        input={1234567890.12}
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
        dataTestId='name'
        maxValue={9999999999}
        minValue={-10}
        onChange={onChangeMock}
        prefix='A'
        suffix='B'
      />,
    );

    const input = screen.getByTestId('name');

    await userEvent.type(input, '123456789');

    expect(onChangeMock).toBeCalledTimes(9);
    expect(onChangeMock).toHaveBeenLastCalledWith(123456789);
    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders triggers onChange with min and max', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <AmountInput dataTestId='name' maxValue={100} minValue={-100} onChange={onChangeMock} />,
    );

    const input = screen.getByTestId('name');

    await userEvent.type(input, '123');

    expect(onChangeMock).toBeCalledTimes(2);
    expect(onChangeMock).toHaveBeenLastCalledWith(12);
    expect(container).toMatchSnapshot();

    await userEvent.clear(input);
    await userEvent.type(input, '-123');
    expect(onChangeMock).toBeCalledTimes(6);
    expect(onChangeMock).toHaveBeenLastCalledWith(-12);
    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders with empty input in read only', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(<AmountInput dataTestId='name' onChange={onChangeMock} readOnly />);

    const input = screen.getByTestId('name');
    await userEvent.type(input, '123456789');
    expect(onChangeMock).toBeCalledTimes(0);
    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders groupint style NONE', () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <AmountInput onChange={onChangeMock} thousandsGroupStyle={ThousandsGroupStyle.NONE} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders with empty input in read only prefix and suffix', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <AmountInput dataTestId='name' onChange={onChangeMock} prefix='A' suffix='B' readOnly />,
    );

    const input = screen.getByTestId('name');
    await userEvent.type(input, '123456789');
    expect(onChangeMock).toBeCalledTimes(0);
    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders with empty input in read only prefix and suffix shorten', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <AmountInput onChange={onChangeMock} dataTestId='name' input='10' prefix='A' suffix='B' readOnly />,
    );

    const input = screen.getByTestId('name');
    await userEvent.type(input, '123456789');
    expect(onChangeMock).toBeCalledTimes(0);
    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders with empty input in read only prefix and suffix shorten', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <AmountInput onChange={onChangeMock} dataTestId='name' input='10' prefix='A' suffix='B' readOnly />,
    );

    const input = screen.getByTestId('name');
    await userEvent.type(input, '123456789');
    expect(onChangeMock).toBeCalledTimes(0);
    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders with in read only shorten highlighted prefix and suffix shorten', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <AmountInput
        dataTestId='name'
        onChange={onChangeMock}
        thousandsGroupStyle={ThousandsGroupStyle.SHORTEN}
        input='1234567890.1234'
        prefix='A'
        highlighted
        suffix='B'
        readOnly={true}
      />,
    );

    const input = screen.getByTestId('name');
    await userEvent.type(input, '123456789');
    expect(onChangeMock).toBeCalledTimes(0);
    expect(container).toMatchSnapshot();
  });

  it('AmountInput renders with input in readonly highlighted shorten', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <AmountInput
        dataTestId='name'
        onChange={onChangeMock}
        thousandsGroupStyle={ThousandsGroupStyle.SHORTEN}
        input='1234567890.1234'
        readOnly={true}
        highlighted
      />,
    );

    const input = screen.getByTestId('name');
    await userEvent.type(input, '123456789');
    expect(onChangeMock).toBeCalledTimes(0);
    expect(container).toMatchSnapshot();
  });
});
