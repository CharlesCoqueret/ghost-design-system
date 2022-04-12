import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DynamicSearchInput from '../DynamicSearchInput';

describe('DynamicSearchInput Component', () => {
  it('DynamicSearchInput renders', async () => {
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve({ value: 'OPTION1', label: 'option 1' });
    });
    const searchOptionsMock = jest.fn().mockImplementation(() => {
      return Promise.resolve([]);
    });
    const noOptionsMessageMock = jest.fn();

    const { container } = render(
      <DynamicSearchInput
        dataTestId='DATA-TEST-ID'
        inputValue={'OPTION1'}
        name='SELECT'
        noOptionsMessage={noOptionsMessageMock}
        resolveValue={resolveValueMock}
        searchOptions={searchOptionsMock}
      />,
    );

    expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(resolveValueMock).toBeCalledWith('OPTION1');
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(1);
    expect(searchOptionsMock).toBeCalledWith('', expect.any(Function));
  });

  it('DynamicSearchInput renders with invalid input value', async () => {
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve(undefined);
    });
    const searchOptionsMock = jest.fn().mockImplementation(() => {
      return Promise.resolve([]);
    });
    const noOptionsMessageMock = jest.fn();

    const { container } = render(
      <DynamicSearchInput
        dataTestId='DATA-TEST-ID'
        inputValue={'OPTION-VALUE-NOT-AVAILABLE'}
        name='SELECT'
        noOptionsMessage={noOptionsMessageMock}
        resolveValue={resolveValueMock}
        searchOptions={searchOptionsMock}
      />,
    );

    expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(resolveValueMock).toBeCalledWith('OPTION-VALUE-NOT-AVAILABLE');
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(1);
    expect(searchOptionsMock).toBeCalledWith('', expect.any(Function));
  });

  it('DynamicSearchInput renders when resolveValue rejects', async () => {
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.reject();
    });
    const searchOptionsMock = jest.fn().mockImplementation(() => {
      return Promise.resolve([]);
    });
    const noOptionsMessageMock = jest.fn();

    const { container } = render(
      <DynamicSearchInput
        dataTestId='DATA-TEST-ID'
        inputValue={'OPTION1'}
        name='SELECT'
        noOptionsMessage={noOptionsMessageMock}
        resolveValue={resolveValueMock}
        searchOptions={searchOptionsMock}
      />,
    );

    expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(resolveValueMock).toBeCalledWith('OPTION1');
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(1);
    expect(searchOptionsMock).toBeCalledWith('', expect.any(Function));
  });

  it('DynamicSearchInput renders without input value', async () => {
    const resolveValueMock = jest.fn();
    const searchOptionsMock = jest.fn().mockImplementation(() => {
      return Promise.resolve([]);
    });
    const noOptionsMessageMock = jest.fn();

    const { container } = render(
      <DynamicSearchInput
        dataTestId='DATA-TEST-ID'
        name='SELECT'
        noOptionsMessage={noOptionsMessageMock}
        resolveValue={resolveValueMock}
        searchOptions={searchOptionsMock}
      />,
    );

    expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(0);
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(1);
    expect(searchOptionsMock).toBeCalledWith('', expect.any(Function));
  });

  it('DynamicSearchInput handles change', async () => {
    const resolveValueMock = jest.fn();
    const searchOptionsMock = jest.fn().mockImplementation((inputValue: string) => {
      if (inputValue === 'option 2') return Promise.resolve([{ value: 'OPTION2', label: 'option 2' }]);
      return Promise.resolve([]);
    });
    const noOptionsMessageMock = jest.fn().mockImplementation(() => {
      return 'No options';
    });
    const onChangeMock = jest.fn();

    const { container } = render(
      <DynamicSearchInput
        dataTestId='DATA-TEST-ID'
        name='SELECT'
        noOptionsMessage={noOptionsMessageMock}
        onChange={onChangeMock}
        resolveValue={resolveValueMock}
        searchOptions={searchOptionsMock}
      />,
    );

    expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();

    const select = await screen.findByRole('combobox');
    userEvent.type(select, 'option 2');

    expect(container).toMatchSnapshot();

    expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    userEvent.type(select, '{enter}');

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(0);
    expect(noOptionsMessageMock).toBeCalled();
    expect(noOptionsMessageMock).toHaveBeenLastCalledWith({ inputValue: 'option 2' });
    expect(searchOptionsMock).toBeCalledTimes('option 2'.length + 1);
    expect(searchOptionsMock).toBeCalledWith('option 2', expect.any(Function));
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith('OPTION2');
  });

  it('DynamicSearchInput handles change with no option string', async () => {
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve({ value: 'OPTION1', label: 'option 1' });
    });
    const searchOptionsMock = jest.fn().mockImplementation((inputValue: string) => {
      if (inputValue === 'option 2') return Promise.resolve([{ value: 'OPTION2', label: 'option 2' }]);
      return Promise.resolve([]);
    });
    const onChangeMock = jest.fn();

    const { container } = render(
      <DynamicSearchInput
        dataTestId='DATA-TEST-ID'
        inputValue={'OPTION1'}
        name='SELECT'
        noOptionsMessage={'No option'}
        onChange={onChangeMock}
        resolveValue={resolveValueMock}
        searchOptions={searchOptionsMock}
      />,
    );

    expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();

    const select = await screen.findByRole('combobox');
    userEvent.type(select, 'option 2');

    expect(container).toMatchSnapshot();

    expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    userEvent.type(select, '{enter}');

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(searchOptionsMock).toBeCalledTimes('option 2'.length + 1);
    expect(searchOptionsMock).toBeCalledWith('option 2', expect.any(Function));
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith('OPTION2');
  });

  it('DynamicSearchInput handles change clearable', async () => {
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve({ value: 'OPTION1', label: 'option 1' });
    });
    const searchOptionsMock = jest.fn().mockImplementation((inputValue: string) => {
      if (inputValue === 'option 2') return Promise.resolve([{ value: 'OPTION2', label: 'option 2' }]);
      return Promise.resolve([]);
    });
    const onChangeMock = jest.fn();

    const { container } = render(
      <DynamicSearchInput
        inputValue={'OPTION1'}
        isClearable
        name='SELECT'
        noOptionsMessage={'No option'}
        onChange={onChangeMock}
        resolveValue={resolveValueMock}
        searchOptions={searchOptionsMock}
      />,
    );

    expect(await screen.findByText('option 1'));

    expect(container).toMatchSnapshot();
  });
  it('DynamicSearchInput renders in readOnly', async () => {
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve({ value: 'OPTION1', label: 'option 1' });
    });
    const searchOptionsMock = jest.fn();
    const noOptionsMessageMock = jest.fn().mockImplementation(() => {
      return 'No options';
    });

    const { container } = render(
      <DynamicSearchInput
        dataTestId='DATA-TEST-ID'
        highlighted
        inputValue={'OPTION1'}
        name='SELECT'
        noOptionsMessage={noOptionsMessageMock}
        readOnly
        resolveValue={resolveValueMock}
        searchOptions={searchOptionsMock}
      />,
    );

    expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
  });

  it('DynamicSearchInput renders in readOnly without datatestid', async () => {
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve({ value: 'OPTION1', label: 'option 1' });
    });
    const searchOptionsMock = jest.fn();
    const noOptionsMessageMock = jest.fn().mockImplementation(() => {
      return 'No options';
    });

    const { container } = render(
      <DynamicSearchInput
        highlighted
        inputValue={'OPTION1'}
        name='SELECT'
        noOptionsMessage={noOptionsMessageMock}
        readOnly
        resolveValue={resolveValueMock}
        searchOptions={searchOptionsMock}
      />,
    );

    expect(screen.queryByTestId('-spinner')).toBeFalsy();

    // Wait until the option is fully resolved
    expect(await screen.findAllByText('option 1'));

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
  });

  it('DynamicSearchInput renders in error and disabled', async () => {
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve({ value: 'OPTION1', label: 'option 1' });
    });
    const searchOptionsMock = jest.fn().mockImplementation(() => {
      return Promise.resolve([]);
    });
    const noOptionsMessage = jest.fn().mockImplementation(() => {
      return 'No options';
    });

    const { container } = render(
      <DynamicSearchInput
        dataTestId='DATA-TEST-ID'
        disabled
        isInError
        inputValue={'OPTION1'}
        name='SELECT'
        noOptionsMessage={noOptionsMessage}
        resolveValue={resolveValueMock}
        searchOptions={searchOptionsMock}
      />,
    );

    expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(noOptionsMessage).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(1);
    expect(searchOptionsMock).toBeCalledWith('', expect.any(Function));
  });

  it('DynamicSearchInput renders in error without portal', async () => {
    const resolveValueMock = jest.fn();
    const searchOptionsMock = jest.fn().mockImplementation(() => {
      return Promise.resolve([]);
    });
    const noOptionsMessageMock = jest.fn().mockImplementation(() => {
      return 'No options';
    });

    const { container } = render(
      <DynamicSearchInput
        dataTestId='DATA-TEST-ID'
        isInError
        name='SELECT'
        noOptionsMessage={noOptionsMessageMock}
        resolveValue={resolveValueMock}
        searchOptions={searchOptionsMock}
        usePortal={false}
      />,
    );

    expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(0);
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(1);
    expect(searchOptionsMock).toBeCalledWith('', expect.any(Function));
  });

  it('DynamicSearchInput handles inputValue change', async () => {
    const resolveValueMock = jest.fn().mockImplementation((input) => {
      if (input === 'OPTION1') return Promise.resolve({ value: 'OPTION1', label: 'option 1' });
      if (input === 'OPTION2') return Promise.resolve({ value: 'OPTION2', label: 'option 2' });
      return Promise.resolve(undefined);
    });
    const searchOptionsMock = jest.fn().mockImplementation(() => {
      return Promise.resolve([]);
    });
    const noOptionsMessageMock = jest.fn();
    const onChangeMock = jest.fn();

    const container = render(
      <DynamicSearchInput
        dataTestId='DATA-TEST-ID'
        inputValue={'OPTION1'}
        name='SELECT'
        noOptionsMessage={noOptionsMessageMock}
        onChange={onChangeMock}
        resolveValue={resolveValueMock}
        searchOptions={searchOptionsMock}
      />,
    );

    expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container.container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(resolveValueMock).toBeCalledWith('OPTION1');
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(1);
    expect(searchOptionsMock).toBeCalledWith('', expect.any(Function));
    expect(onChangeMock).toBeCalledTimes(0);

    container.rerender(
      <DynamicSearchInput
        dataTestId='DATA-TEST-ID'
        inputValue={'OPTION2'}
        name='SELECT'
        noOptionsMessage={noOptionsMessageMock}
        onChange={onChangeMock}
        resolveValue={resolveValueMock}
        searchOptions={searchOptionsMock}
      />,
    );

    expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container?.container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(2);
    expect(resolveValueMock).toBeCalledWith('OPTION2');
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledTimes(0);
  });

  it('DynamicSearchInput handles change to undefined', async () => {
    const resolveValueMock = jest.fn().mockImplementation((input) => {
      if (input === 'OPTION1') return Promise.resolve({ value: 'OPTION1', label: 'option 1' });
      return Promise.resolve(undefined);
    });
    const searchOptionsMock = jest.fn().mockImplementation(() => {
      return Promise.resolve([]);
    });
    const noOptionsMessageMock = jest.fn();
    const onChangeMock = jest.fn();

    const { container } = render(
      <DynamicSearchInput
        dataTestId='DATA-TEST-ID'
        inputValue={'OPTION1'}
        isClearable
        name='SELECT'
        noOptionsMessage={noOptionsMessageMock}
        onChange={onChangeMock}
        resolveValue={resolveValueMock}
        searchOptions={searchOptionsMock}
      />,
    );

    expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(resolveValueMock).toBeCalledWith('OPTION1');
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(1);
    expect(searchOptionsMock).toBeCalledWith('', expect.any(Function));
    expect(onChangeMock).toBeCalledTimes(0);

    const select = await screen.findByRole('combobox');
    userEvent.type(select, '{backspace}');

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(resolveValueMock).toBeCalledWith('OPTION1');
    expect(noOptionsMessageMock).toBeCalledTimes(2);
    expect(searchOptionsMock).toBeCalledTimes(1);
    expect(searchOptionsMock).toBeCalledWith('', expect.any(Function));
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith(undefined);
  });
});
