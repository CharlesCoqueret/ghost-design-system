import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SelectInput from '../SelectInput';

describe('SelectInput Component', () => {
  it('SelectInput renders', async () => {
    const { container } = render(
      <SelectInput
        name='SELECT'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('SelectInput handles change', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <SelectInput
        name='SELECT'
        onChange={onChangeMock}
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();

    const select = await screen.findByRole('combobox');

    userEvent.type(select, 'option 2{enter}');

    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith('OPTION2');
  });

  it('SelectInput handles change with empty value when clearable', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <SelectInput
        isClearable
        name='SELECT'
        onChange={onChangeMock}
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();

    const select = await screen.findByRole('combobox');

    userEvent.type(select, '{enter}');

    userEvent.type(select, '{backspace}');
    expect(onChangeMock).toBeCalledTimes(2);
    expect(onChangeMock).toBeCalledWith('OPTION1');
    expect(onChangeMock).toBeCalledWith(undefined);
  });

  it('SelectInput renders in readOnly', async () => {
    const { container } = render(
      <SelectInput
        name='SELECT'
        inputValue='OPTION2'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
        readOnly
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('SelectInput renders in readOnly with invalid value', async () => {
    const { container } = render(
      <SelectInput
        name='SELECT'
        inputValue='OPTION-VALUE-NOT-AVAILABLE'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
        readOnly
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('SelectInput renders without portal', async () => {
    const { container } = render(
      <SelectInput
        name='SELECT'
        inputValue='OPTION-VALUE-NOT-AVAILABLE'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
        usePortal={false}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('SelectInput renders with fieldsize, highlight in readOnly', async () => {
    const { container } = render(
      <SelectInput
        fieldSize={5}
        highlighted
        inputValue='OPTION-VALUE-NOT-AVAILABLE'
        name='SELECT'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
        readOnly
      />,
    );
    expect(container).toMatchSnapshot();
  });
  it('SelectInput renders with fieldsize, inError', async () => {
    const { container } = render(
      <SelectInput
        fieldSize={8}
        inputValue='OPTION-VALUE-NOT-AVAILABLE'
        isInError
        name='SELECT'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('SelectInput renders disabled', async () => {
    const { container } = render(
      <SelectInput
        disabled
        inputValue='OPTION-VALUE-NOT-AVAILABLE'
        name='SELECT'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
