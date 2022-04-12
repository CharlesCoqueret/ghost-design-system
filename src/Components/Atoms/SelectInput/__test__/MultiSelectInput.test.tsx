import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MultiSelectInput from '../MultiSelectInput';

describe('MultiSelectInput Component', () => {
  it('MultiSelectInput renders', () => {
    const { container } = render(
      <MultiSelectInput
        name='SELECT'
        inputValue={['OPTION1']}
        numberOfItemLabel='{} item selected'
        numberOfItemsLabel='{} items selected'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('MultiSelectInput renders with multiple input values', () => {
    const { container } = render(
      <MultiSelectInput
        dataTestId='DATA-TEST-ID'
        inputValue={['OPTION1', 'OPTION2']}
        name='SELECT'
        numberOfItemLabel='{} item selected'
        numberOfItemsLabel='{} items selected'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('MultiSelectInput renders without input value', () => {
    const { container } = render(
      <MultiSelectInput
        name='SELECT'
        numberOfItemLabel='{} item selected'
        numberOfItemsLabel='{} items selected'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('MultiSelectInput renders with invalid input value', () => {
    const { container } = render(
      <MultiSelectInput
        name='SELECT'
        inputValue={['OPTION-VALUE-NOT-AVAILABLE']}
        numberOfItemLabel='{} item selected'
        numberOfItemsLabel='{} items selected'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('MultiSelectInput handles change', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <MultiSelectInput
        name='SELECT'
        onChange={onChangeMock}
        numberOfItemLabel='{} item selected'
        numberOfItemsLabel='{} items selected'
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
    expect(onChangeMock).toBeCalledWith(['OPTION2']);
  });

  it('MultiSelectInput handles change with empty value when clearable', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <MultiSelectInput
        isClearable
        name='SELECT'
        numberOfItemLabel='{} item selected'
        numberOfItemsLabel='{} items selected'
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
    expect(onChangeMock).toBeCalledWith(['OPTION1']);
    expect(onChangeMock).toBeCalledWith([]);
  });

  it('MultiSelectInput renders in readOnly', () => {
    const { container } = render(
      <MultiSelectInput
        name='SELECT'
        inputValue={['OPTION2']}
        numberOfItemLabel='{} item selected'
        numberOfItemsLabel='{} items selected'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
        readOnly
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('MultiSelectInput renders with valid value and clearable', () => {
    const { container } = render(
      <MultiSelectInput
        dataTestId='DATA-TEST-ID'
        name='SELECT'
        inputValue={['OPTION1']}
        isClearable
        numberOfItemLabel='{} item selected'
        numberOfItemsLabel='{} items selected'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('MultiSelectInput renders with valid value and clearable without data-test-id', () => {
    const { container } = render(
      <MultiSelectInput
        name='SELECT'
        inputValue={['OPTION1']}
        isClearable
        numberOfItemLabel='{} item selected'
        numberOfItemsLabel='{} items selected'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('MultiSelectInput renders in readOnly with invalid value', () => {
    const { container } = render(
      <MultiSelectInput
        name='SELECT'
        inputValue={['OPTION-VALUE-NOT-AVAILABLE']}
        numberOfItemLabel='{} item selected'
        numberOfItemsLabel='{} items selected'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
        readOnly
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('MultiSelectInput renders in readOnly without input value', () => {
    const { container } = render(
      <MultiSelectInput
        name='SELECT'
        numberOfItemLabel='{} item selected'
        numberOfItemsLabel='{} items selected'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
        readOnly
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('MultiSelectInput renders without portal', () => {
    const { container } = render(
      <MultiSelectInput
        name='SELECT'
        inputValue={['OPTION-VALUE-NOT-AVAILABLE']}
        numberOfItemLabel='{} item selected'
        numberOfItemsLabel='{} items selected'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
        usePortal={false}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('MultiSelectInput renders highlight in readOnly', () => {
    const { container } = render(
      <MultiSelectInput
        highlighted
        inputValue={['OPTION-VALUE-NOT-AVAILABLE']}
        name='SELECT'
        numberOfItemLabel='{} item selected'
        numberOfItemsLabel='{} items selected'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
        readOnly
      />,
    );
    expect(container).toMatchSnapshot();
  });
  it('MultiSelectInput renders inError', () => {
    const { container } = render(
      <MultiSelectInput
        inputValue={['OPTION-VALUE-NOT-AVAILABLE']}
        isInError
        name='SELECT'
        numberOfItemLabel='{} item selected'
        numberOfItemsLabel='{} items selected'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('MultiSelectInput renders disabled', () => {
    const { container } = render(
      <MultiSelectInput
        disabled
        inputValue={['OPTION-VALUE-NOT-AVAILABLE']}
        name='SELECT'
        numberOfItemLabel='{} item selected'
        numberOfItemsLabel='{} items selected'
        options={[
          { value: 'OPTION1', label: 'option 1' },
          { value: 'OPTION2', label: 'option 2' },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
