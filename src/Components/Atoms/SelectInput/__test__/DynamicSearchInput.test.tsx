import React from 'react';
import { act, render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DynamicSearchInput from '../DynamicSearchInput';

describe('DynamicSearchInput Component', () => {
  it('DynamicSearchInput renders', async () => {
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve({ value: 'OPTION1', label: 'option 1' });
    });
    const searchOptionsMock = jest.fn();
    const noOptionsMessageMock = jest.fn();

    let container: RenderResult | undefined;

    await act(async () => {
      container = render(
        <DynamicSearchInput
          dataTestId='DATA-TEST-ID'
          inputValue={'OPTION1'}
          name='SELECT'
          noOptionsMessage={noOptionsMessageMock}
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
        />,
      );

      expect(await container?.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    });

    expect(container?.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(resolveValueMock).toBeCalledWith('OPTION1');
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
  });

  it('DynamicSearchInput renders with invalid input value', async () => {
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve(undefined);
    });
    const searchOptionsMock = jest.fn();
    const noOptionsMessageMock = jest.fn();

    let container: RenderResult | undefined;

    await act(async () => {
      container = render(
        <DynamicSearchInput
          dataTestId='DATA-TEST-ID'
          inputValue={'OPTION-VALUE-NOT-AVAILABLE'}
          name='SELECT'
          noOptionsMessage={noOptionsMessageMock}
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
        />,
      );

      expect(await container?.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    });

    expect(container?.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(resolveValueMock).toBeCalledWith('OPTION-VALUE-NOT-AVAILABLE');
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
  });

  it('DynamicSearchInput renders when resolveValue rejects', async () => {
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.reject();
    });
    const searchOptionsMock = jest.fn();
    const noOptionsMessageMock = jest.fn();

    let container: RenderResult | undefined;

    await act(async () => {
      container = render(
        <DynamicSearchInput
          dataTestId='DATA-TEST-ID'
          inputValue={'OPTION1'}
          name='SELECT'
          noOptionsMessage={noOptionsMessageMock}
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
        />,
      );

      expect(await container?.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    });

    expect(container?.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(resolveValueMock).toBeCalledWith('OPTION1');
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
  });

  it('DynamicSearchInput renders without input value', async () => {
    const resolveValueMock = jest.fn();
    const searchOptionsMock = jest.fn();
    const noOptionsMessageMock = jest.fn();

    let container: RenderResult | undefined;

    await act(async () => {
      container = render(
        <DynamicSearchInput
          dataTestId='DATA-TEST-ID'
          name='SELECT'
          noOptionsMessage={noOptionsMessageMock}
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
        />,
      );

      expect(container?.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();
    });

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(0);
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
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

    let container: RenderResult | undefined;

    act(() => {
      container = render(
        <DynamicSearchInput
          name='SELECT'
          noOptionsMessage={noOptionsMessageMock}
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
        />,
      );
    });

    await act(async () => {
      const select = await container?.findByRole('combobox');
      expect(select).not.toBeUndefined();
      if (select) {
        userEvent.type(select, 'option 2{enter}');
      }
    });

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(0);
    expect(noOptionsMessageMock).toBeCalled();
    expect(noOptionsMessageMock).toBeCalledWith({ inputValue: 'option 2' });
    expect(searchOptionsMock).toBeCalledTimes('option 2'.length);
    expect(searchOptionsMock).toBeCalledWith('option 2', expect.any(Function));
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

    let container: RenderResult | undefined;

    await act(async () => {
      container = render(
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

      expect(await container?.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    });

    expect(container?.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    await act(async () => {
      const select = await container?.findByRole('combobox');
      expect(select).not.toBeUndefined();
      if (select) {
        userEvent.type(select, 'option 2');
      }
    });

    // Let the underlaying select component update its internal state
    await act(async () => {
      const select = await container?.findByRole('combobox');
      expect(select).not.toBeUndefined();
      if (select) {
        userEvent.type(select, '{enter}');
      }
    });

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(searchOptionsMock).toBeCalledTimes('option 2'.length);
    expect(searchOptionsMock).toBeCalledWith('option 2', expect.any(Function));
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith('OPTION2');
  });

  it('DynamicSearchInput renders in readOnly', async () => {
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve({ value: 'OPTION1', label: 'option 1' });
    });
    const searchOptionsMock = jest.fn();
    const noOptionsMessageMock = jest.fn().mockImplementation(() => {
      return 'No options';
    });

    let container: RenderResult | undefined;

    await act(async () => {
      container = render(
        <DynamicSearchInput
          dataTestId='DATA-TEST-ID'
          fieldSize={4}
          highlighted
          inputValue={'OPTION1'}
          name='SELECT'
          noOptionsMessage={noOptionsMessageMock}
          readOnly
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
        />,
      );

      expect(await container?.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    });

    expect(container?.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

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

    let container: RenderResult | undefined;

    await act(async () => {
      container = render(
        <DynamicSearchInput
          fieldSize={4}
          highlighted
          inputValue={'OPTION1'}
          name='SELECT'
          noOptionsMessage={noOptionsMessageMock}
          readOnly
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
        />,
      );
    });

    expect(container?.queryByTestId('-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
  });

  it('DynamicSearchInput renders in error and disabled', async () => {
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve({ value: 'OPTION1', label: 'option 1' });
    });
    const searchOptionsMock = jest.fn();
    const noOptionsMessage = jest.fn().mockImplementation(() => {
      return 'No options';
    });

    let container: RenderResult | undefined;

    await act(async () => {
      container = render(
        <DynamicSearchInput
          dataTestId='DATA-TEST-ID'
          disabled
          fieldSize={4}
          isInError
          inputValue={'OPTION1'}
          name='SELECT'
          noOptionsMessage={noOptionsMessage}
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
        />,
      );

      expect(await container?.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    });

    expect(container?.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(noOptionsMessage).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
  });

  it('DynamicSearchInput renders in error without portal', async () => {
    const resolveValueMock = jest.fn();
    const searchOptionsMock = jest.fn();
    const noOptionsMessageMock = jest.fn().mockImplementation(() => {
      return 'No options';
    });

    let container: RenderResult | undefined;

    await act(async () => {
      container = render(
        <DynamicSearchInput
          dataTestId='DATA-TEST-ID'
          fieldSize={4}
          isInError
          name='SELECT'
          noOptionsMessage={noOptionsMessageMock}
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
          usePortal={false}
        />,
      );

      expect(container?.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();
    });

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(0);
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
  });

  it('DynamicSearchInput handles inputValue change', async () => {
    const resolveValueMock = jest.fn().mockImplementation((input) => {
      if (input === 'OPTION1') return Promise.resolve({ value: 'OPTION1', label: 'option 1' });
      if (input === 'OPTION2') return Promise.resolve({ value: 'OPTION2', label: 'option 2' });
      return Promise.resolve(undefined);
    });
    const searchOptionsMock = jest.fn();
    const noOptionsMessageMock = jest.fn();
    const onChangeMock = jest.fn();

    let container: RenderResult | undefined;

    await act(async () => {
      container = render(
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

      expect(await container?.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    });

    expect(container?.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(resolveValueMock).toBeCalledWith('OPTION1');
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
    expect(onChangeMock).toBeCalledTimes(0);

    await act(async () => {
      container?.rerender(
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

      expect(await container?.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    });

    expect(container?.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(2);
    expect(resolveValueMock).toBeCalledWith('OPTION2');
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
    expect(onChangeMock).toBeCalledTimes(0);
  });

  it('DynamicSearchInput handles change to undefined', async () => {
    const resolveValueMock = jest.fn().mockImplementation((input) => {
      if (input === 'OPTION1') return Promise.resolve({ value: 'OPTION1', label: 'option 1' });
      return Promise.resolve(undefined);
    });
    const searchOptionsMock = jest.fn().mockImplementation(() => {
      return Promise.resolve(undefined);
    });
    const noOptionsMessageMock = jest.fn();
    const onChangeMock = jest.fn();

    let container: RenderResult | undefined;

    await act(async () => {
      container = render(
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

      expect(await container?.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    });

    expect(container?.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(resolveValueMock).toBeCalledWith('OPTION1');
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
    expect(onChangeMock).toBeCalledTimes(0);

    await act(async () => {
      const select = await container?.findByRole('combobox');
      expect(select).not.toBeUndefined();
      if (select) {
        userEvent.type(select, '{backspace}');
      }
    });

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(resolveValueMock).toBeCalledWith('OPTION1');
    expect(noOptionsMessageMock).toBeCalledTimes(2);
    expect(searchOptionsMock).toBeCalledTimes(0);
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith(undefined);
  });
});
