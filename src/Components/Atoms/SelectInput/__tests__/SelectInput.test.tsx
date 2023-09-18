import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SelectInput from '../SelectInput';

describe('SelectInput Component', () => {
  it('SelectInput renders', () => {
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
        input={'OPTION1'}
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

    userEvent.type(select, '{backspace}option 2{enter}');

    expect(onChangeMock).toBeCalledTimes(2);
    expect(onChangeMock).toBeCalledWith('OPTION2');
  });

  it('SelectInput handles change with data-testid', () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <SelectInput
        dataTestId='DATA-TEST-ID'
        input='OPTION1'
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
  });

  it('SelectInput handles change with empty value when clearable', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <SelectInput
        dataTestId='DATA-TEST-ID'
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

  it('SelectInput renders in readOnly', () => {
    const { container } = render(
      <SelectInput
        name='SELECT'
        input='OPTION2'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
        readOnly
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('SelectInput renders in readOnly with invalid value', () => {
    const { container } = render(
      <SelectInput
        name='SELECT'
        input='OPTION-VALUE-NOT-AVAILABLE'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
        readOnly
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('SelectInput renders without portal', () => {
    const { container } = render(
      <SelectInput
        name='SELECT'
        input='OPTION-VALUE-NOT-AVAILABLE'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
        usePortal={false}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('SelectInput renders highlight in readOnly', () => {
    const { container } = render(
      <SelectInput
        highlighted
        input='OPTION-VALUE-NOT-AVAILABLE'
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

  it('SelectInput renders with fieldsize, inError', () => {
    const { container } = render(
      <SelectInput
        input='OPTION-VALUE-NOT-AVAILABLE'
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

  it('SelectInput renders disabled', () => {
    const { container } = render(
      <SelectInput
        disabled
        input='OPTION-VALUE-NOT-AVAILABLE'
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
