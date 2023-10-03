import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { IToggleEntry } from '../../CheckBoxInput/types';
import { SwitchInput } from '..';

const options: Array<IToggleEntry> = [
  { label: 'Switch label 0', value: 'KEY_0' },
  { label: 'Switch label 1', value: 'KEY_1', checked: true },
  { label: 'Switch label 2', value: 'KEY_2', checked: false },
  { label: 'Switch label 3', value: 'KEY_3', checked: undefined },
  { label: 'Switch label 4', value: 'KEY_4', highlighted: true },
  { label: 'Switch label 5', value: 'KEY_5' },
];

describe('SwitchInput Component', () => {
  it('SwitchInput renders with input', () => {
    const onChangeMock = jest.fn();

    const { container } = render(<SwitchInput onChange={onChangeMock} input={options} />);
    expect(container).toMatchSnapshot();
    expect(onChangeMock).toBeCalledTimes(0);
  });

  it('SwitchInput renders triggers onChange', async () => {
    const onChangeMock = jest.fn();

    render(<SwitchInput dataTestId='DATA-TEST-ID' onChange={onChangeMock} input={options} />);

    const firstSwitch = screen.getByTestId('DATA-TEST-ID-0');

    await userEvent.click(firstSwitch);
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toHaveBeenLastCalledWith([
      { label: 'Switch label 0', value: 'KEY_0', checked: true },
      ...options.slice(1),
    ]);

    await userEvent.click(firstSwitch);
    expect(onChangeMock).toBeCalledTimes(2);
    expect(onChangeMock).toHaveBeenLastCalledWith([
      { label: 'Switch label 0', value: 'KEY_0', checked: false },
      ...options.slice(1),
    ]);
  });

  it('SwitchInput renders triggers onChange via keyboard', async () => {
    const onChangeMock = jest.fn();

    render(<SwitchInput onChange={onChangeMock} input={options} />);

    await userEvent.tab();

    await userEvent.keyboard('a');
    expect(onChangeMock).toBeCalledTimes(0);

    await userEvent.keyboard(' ');
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toHaveBeenLastCalledWith([
      { label: 'Switch label 0', value: 'KEY_0', checked: true },
      ...options.slice(1),
    ]);

    await userEvent.keyboard(' ');
    expect(onChangeMock).toBeCalledTimes(2);
    expect(onChangeMock).toHaveBeenLastCalledWith([
      { label: 'Switch label 0', value: 'KEY_0', checked: false },
      ...options.slice(1),
    ]);
  });

  it('SwitchInput renders does not trigger onChange when disabled', async () => {
    const onChangeMock = jest.fn();

    render(<SwitchInput dataTestId='DATA-TEST-ID' onChange={onChangeMock} disabled input={options} />);

    const firstSwitch = screen.getByTestId('DATA-TEST-ID-0');

    await userEvent.click(firstSwitch);
    expect(onChangeMock).toBeCalledTimes(0);

    await userEvent.click(firstSwitch);
    expect(onChangeMock).toBeCalledTimes(0);
  });

  it('SwitchInput renders does not trigger onChange when readOnly', async () => {
    const onChangeMock = jest.fn();

    render(<SwitchInput dataTestId='DATA-TEST-ID' onChange={onChangeMock} readOnly input={options} />);

    const firstSwitch = screen.getByTestId('DATA-TEST-ID-0');

    await userEvent.click(firstSwitch);
    expect(onChangeMock).toBeCalledTimes(0);

    await userEvent.click(firstSwitch);
    expect(onChangeMock).toBeCalledTimes(0);
  });

  it('SwitchInput renders highlighted', () => {
    const onChangeMock = jest.fn();

    const { container } = render(<SwitchInput onChange={onChangeMock} readOnly highlighted input={options} />);
    expect(container).toMatchSnapshot();
    expect(onChangeMock).toBeCalledTimes(0);
  });

  it('SwitchInput renders with no options', () => {
    const onChangeMock = jest.fn();

    const { container } = render(<SwitchInput onChange={onChangeMock} readOnly highlighted input={[]} />);
    expect(container).toMatchSnapshot();
    expect(onChangeMock).toBeCalledTimes(0);
  });
});
