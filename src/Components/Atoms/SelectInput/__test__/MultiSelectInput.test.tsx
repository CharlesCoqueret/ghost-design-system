import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MultiSelectInput from '../MultiSelectInput';

describe('MultiSelectInput Component', () => {
  it('MultiSelectInput renders', async () => {
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

  it('MultiSelectInput renders with multiple input values', async () => {
    const { container } = render(
      <MultiSelectInput
        name='SELECT'
        inputValue={['OPTION1', 'OPTION2']}
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

  it('MultiSelectInput renders without input value', async () => {
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

  it('MultiSelectInput renders with invalid input value', async () => {
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

  it('MultiSelectInput renders in readOnly', async () => {
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

  it('MultiSelectInput renders in readOnly with invalid value', async () => {
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

  it('MultiSelectInput renders in readOnly without input value', async () => {
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

  it('MultiSelectInput renders without portal', async () => {
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

  it('MultiSelectInput renders with fieldsize, highlight in readOnly', async () => {
    const { container } = render(
      <MultiSelectInput
        fieldSize={5}
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
  it('MultiSelectInput renders with fieldsize, inError', async () => {
    const { container } = render(
      <MultiSelectInput
        fieldSize={8}
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

  it('MultiSelectInput renders disabled', async () => {
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
