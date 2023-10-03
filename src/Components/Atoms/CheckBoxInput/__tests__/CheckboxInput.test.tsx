import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CheckboxInput, IToggleEntry } from '..';

const options: Array<IToggleEntry> = [
  { label: 'checkbox label 0', value: 'KEY_0' },
  { label: 'checkbox label 1', value: 'KEY_1', checked: true },
  { label: 'checkbox label 2', value: 'KEY_2', checked: false },
  { label: 'checkbox label 3', value: 'KEY_3', checked: undefined },
  { label: 'checkbox label 4', value: 'KEY_4', highlighted: true },
  { label: 'checkbox label 5', value: 'KEY_5' },
];

describe('CheckboxInput Component', () => {
  it('CheckboxInput renders with input', () => {
    const onChangeMock = jest.fn();

    const { container } = render(<CheckboxInput onChange={onChangeMock} input={options} />);
    expect(container).toMatchSnapshot();
    expect(onChangeMock).toBeCalledTimes(0);
  });

  it('CheckboxInput renders triggers onChange', async () => {
    const onChangeMock = jest.fn();

    render(<CheckboxInput dataTestId='DATA-TEST-ID' onChange={onChangeMock} input={options} />);

    const firstCheckbox = screen.getByTestId('DATA-TEST-ID-0');

    await userEvent.click(firstCheckbox);
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toHaveBeenLastCalledWith([
      { label: 'checkbox label 0', value: 'KEY_0', checked: true },
      ...options.slice(1),
    ]);

    await userEvent.click(firstCheckbox);
    expect(onChangeMock).toBeCalledTimes(2);
    expect(onChangeMock).toHaveBeenLastCalledWith([
      { label: 'checkbox label 0', value: 'KEY_0', checked: false },
      ...options.slice(1),
    ]);
  });

  it('CheckboxInput renders triggers onChange via keyboard', async () => {
    const onChangeMock = jest.fn();

    render(<CheckboxInput dataTestId='DATA-TEST-ID' onChange={onChangeMock} input={options} />);

    await userEvent.tab();
    await userEvent.keyboard('a');
    expect(onChangeMock).toBeCalledTimes(0);

    await userEvent.keyboard(' ');
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toHaveBeenLastCalledWith([
      { label: 'checkbox label 0', value: 'KEY_0', checked: true },
      ...options.slice(1),
    ]);

    await userEvent.keyboard(' ');
    expect(onChangeMock).toBeCalledTimes(2);
    expect(onChangeMock).toHaveBeenLastCalledWith([
      { label: 'checkbox label 0', value: 'KEY_0', checked: false },
      ...options.slice(1),
    ]);
  });

  it('CheckboxInput renders does not trigger onChange when disabled', async () => {
    const onChangeMock = jest.fn();

    render(<CheckboxInput dataTestId='DATA-TEST-ID' disabled onChange={onChangeMock} input={options} />);

    const firstCheckbox = screen.getByTestId('DATA-TEST-ID-0');

    await userEvent.click(firstCheckbox);
    expect(onChangeMock).toBeCalledTimes(0);

    await userEvent.click(firstCheckbox);
    expect(onChangeMock).toBeCalledTimes(0);
  });

  it('CheckboxInput renders does not trigger onChange when readOnly', async () => {
    const onChangeMock = jest.fn();

    render(<CheckboxInput dataTestId='DATA-TEST-ID' onChange={onChangeMock} input={options} readOnly />);

    const firstCheckbox = screen.getByTestId('DATA-TEST-ID-0');

    await userEvent.click(firstCheckbox);
    expect(onChangeMock).toBeCalledTimes(0);

    await userEvent.click(firstCheckbox);
    expect(onChangeMock).toBeCalledTimes(0);
  });

  it('CheckboxInput renders highlighted', () => {
    const onChangeMock = jest.fn();

    const { container } = render(<CheckboxInput onChange={onChangeMock} readOnly highlighted input={options} />);
    expect(container).toMatchSnapshot();
    expect(onChangeMock).toBeCalledTimes(0);
  });

  it('CheckboxInput renders with no options', () => {
    const onChangeMock = jest.fn();

    const { container } = render(<CheckboxInput onChange={onChangeMock} readOnly highlighted input={[]} />);
    expect(container).toMatchSnapshot();
    expect(onChangeMock).toBeCalledTimes(0);
  });
});
