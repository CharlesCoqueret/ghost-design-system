import React from 'react';
import { act, render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DynamicSearchCreatableInput from '../DynamicSearchCreatableInput';

describe('DynamicSearchCreatableInput Component', () => {
  it('DynamicSearchCreatableInput renders', async () => {
    const handleCreateMock = jest.fn();
    const noOptionsMessageMock = jest.fn();
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve({ value: 'OPTION1', label: 'option 1' });
    });
    const searchOptionsMock = jest.fn();

    let container: HTMLElement | undefined;

    await act(async () => {
      container = render(
        <DynamicSearchCreatableInput
          dataTestId='DATA-TEST-ID'
          handleCreate={handleCreateMock}
          inputValue={'OPTION1'}
          name='SELECT'
          noOptionsMessage={noOptionsMessageMock}
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
        />,
      ).container;

      expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    });

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(handleCreateMock).toBeCalledTimes(0);
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(resolveValueMock).toBeCalledWith('OPTION1');
    expect(searchOptionsMock).toBeCalledTimes(0);
  });

  it('DynamicSearchCreatableInput renders with invalid input value', async () => {
    const handleCreateMock = jest.fn();
    const noOptionsMessageMock = jest.fn();
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve(undefined);
    });
    const searchOptionsMock = jest.fn();

    let container: HTMLElement | undefined;

    await act(async () => {
      container = render(
        <DynamicSearchCreatableInput
          dataTestId='DATA-TEST-ID'
          handleCreate={handleCreateMock}
          inputValue={'OPTION-VALUE-NOT-AVAILABLE'}
          name='SELECT'
          noOptionsMessage={noOptionsMessageMock}
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
        />,
      ).container;

      expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    });

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(handleCreateMock).toBeCalledTimes(0);
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(resolveValueMock).toBeCalledWith('OPTION-VALUE-NOT-AVAILABLE');
    expect(searchOptionsMock).toBeCalledTimes(0);
  });

  it('DynamicSearchCreatableInput renders when resolveValue rejects', async () => {
    const handleCreateMock = jest.fn();
    const noOptionsMessageMock = jest.fn();
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.reject();
    });
    const searchOptionsMock = jest.fn();

    let container: HTMLElement | undefined;

    await act(async () => {
      container = render(
        <DynamicSearchCreatableInput
          dataTestId='DATA-TEST-ID'
          handleCreate={handleCreateMock}
          inputValue={'OPTION1'}
          name='SELECT'
          noOptionsMessage={noOptionsMessageMock}
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
        />,
      ).container;

      expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    });

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(handleCreateMock).toBeCalledTimes(0);
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(resolveValueMock).toBeCalledWith('OPTION1');
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
  });

  it('DynamicSearchCreatableInput renders without input value', async () => {
    const handleCreateMock = jest.fn();
    const noOptionsMessageMock = jest.fn();
    const resolveValueMock = jest.fn();
    const searchOptionsMock = jest.fn();

    let container: HTMLElement | undefined;

    await act(async () => {
      container = render(
        <DynamicSearchCreatableInput
          dataTestId='DATA-TEST-ID'
          handleCreate={handleCreateMock}
          name='SELECT'
          noOptionsMessage={noOptionsMessageMock}
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
        />,
      ).container;

      expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();
    });

    expect(container).toMatchSnapshot();
    expect(handleCreateMock).toBeCalledTimes(0);
    expect(resolveValueMock).toBeCalledTimes(0);
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
  });

  it('DynamicSearchCreatableInput handles change', async () => {
    const handleCreateMock = jest.fn();
    const noOptionsMessageMock = jest.fn().mockImplementation(() => {
      return 'No options';
    });
    const resolveValueMock = jest.fn();
    const searchOptionsMock = jest.fn().mockImplementation((inputValue: string) => {
      if (inputValue === 'option 2') return Promise.resolve([{ value: 'OPTION2', label: 'option 2' }]);
      return Promise.resolve([]);
    });

    let container: HTMLElement | undefined;

    act(() => {
      container = render(
        <DynamicSearchCreatableInput
          name='SELECT'
          handleCreate={handleCreateMock}
          isClearable
          noOptionsMessage={noOptionsMessageMock}
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
        />,
      ).container;
    });

    await act(async () => {
      const select = await screen.findByRole('combobox');
      expect(select).not.toBeUndefined();
      if (select) {
        userEvent.type(select, 'option 2{enter}');
      }
    });

    expect(container).toMatchSnapshot();
    expect(handleCreateMock).toBeCalledTimes(0);
    expect(resolveValueMock).toBeCalledTimes(0);
    expect(noOptionsMessageMock).toBeCalled();
    expect(searchOptionsMock).toBeCalledTimes('option 2'.length);
    expect(searchOptionsMock).toBeCalledWith('option 2', expect.any(Function));
  });

  it('DynamicSearchCreatableInput handles change with no option string', async () => {
    const handleCreateMock = jest.fn();
    const onChangeMock = jest.fn();
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve({ value: 'OPTION1', label: 'option 1' });
    });
    const searchOptionsMock = jest.fn().mockImplementation((inputValue: string) => {
      if (inputValue === 'option 2') return Promise.resolve([{ value: 'OPTION2', label: 'option 2' }]);
      return Promise.resolve([]);
    });

    let container: HTMLElement | undefined;

    await act(async () => {
      container = render(
        <DynamicSearchCreatableInput
          dataTestId='DATA-TEST-ID'
          handleCreate={handleCreateMock}
          inputValue={'OPTION1'}
          name='SELECT'
          noOptionsMessage={'No option'}
          onChange={onChangeMock}
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
        />,
      ).container;

      expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    });

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    await act(async () => {
      const select = await screen.findByRole('combobox');
      expect(select).not.toBeUndefined();
      if (select) {
        userEvent.type(select, 'option 2');
      }
    });

    // Let the underlaying select component update its internal state
    await act(async () => {
      const select = await screen.findByRole('combobox');
      expect(select).not.toBeUndefined();
      if (select) {
        userEvent.type(select, '{enter}');
      }
    });

    expect(container).toMatchSnapshot();
    expect(handleCreateMock).toBeCalledTimes(0);
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(searchOptionsMock).toBeCalledTimes('option 2'.length);
    expect(searchOptionsMock).toBeCalledWith('option 2', expect.any(Function));
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith('OPTION2');
  });

  it('DynamicSearchCreatableInput renders in readOnly', async () => {
    const handleCreateMock = jest.fn();
    const noOptionsMessageMock = jest.fn().mockImplementation(() => {
      return 'No options';
    });
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve({ value: 'OPTION1', label: 'option 1' });
    });
    const searchOptionsMock = jest.fn();

    let container: HTMLElement | undefined;

    await act(async () => {
      container = render(
        <DynamicSearchCreatableInput
          dataTestId='DATA-TEST-ID'
          handleCreate={handleCreateMock}
          fieldSize={4}
          highlighted
          inputValue={'OPTION1'}
          name='SELECT'
          noOptionsMessage={noOptionsMessageMock}
          readOnly
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
        />,
      ).container;

      expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    });

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(handleCreateMock).toBeCalledTimes(0);
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
  });

  it('DynamicSearchCreatableInput renders in readOnly without datatestid', async () => {
    const handleCreateMock = jest.fn();
    const noOptionsMessageMock = jest.fn().mockImplementation(() => {
      return 'No options';
    });
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve({ value: 'OPTION1', label: 'option 1' });
    });
    const searchOptionsMock = jest.fn();

    let container: HTMLElement | undefined;

    await act(async () => {
      container = render(
        <DynamicSearchCreatableInput
          fieldSize={4}
          handleCreate={handleCreateMock}
          highlighted
          inputValue={'OPTION1'}
          name='SELECT'
          noOptionsMessage={noOptionsMessageMock}
          readOnly
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
        />,
      ).container;
    });

    expect(screen.queryByTestId('-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(handleCreateMock).toBeCalledTimes(0);
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
  });

  it('DynamicSearchCreatableInput renders in error and disabled', async () => {
    const handleCreateMock = jest.fn();
    const noOptionsMessage = jest.fn().mockImplementation(() => {
      return 'No options';
    });
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve({ value: 'OPTION1', label: 'option 1' });
    });
    const searchOptionsMock = jest.fn();

    let container: HTMLElement | undefined;

    await act(async () => {
      container = render(
        <DynamicSearchCreatableInput
          dataTestId='DATA-TEST-ID'
          disabled
          fieldSize={4}
          handleCreate={handleCreateMock}
          isInError
          inputValue={'OPTION1'}
          name='SELECT'
          noOptionsMessage={noOptionsMessage}
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
        />,
      ).container;

      expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    });

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(handleCreateMock).toBeCalledTimes(0);
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(noOptionsMessage).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
  });

  it('DynamicSearchCreatableInput renders in error without portal', async () => {
    const handleCreateMock = jest.fn();
    const noOptionsMessageMock = jest.fn().mockImplementation(() => {
      return 'No options';
    });
    const resolveValueMock = jest.fn();
    const searchOptionsMock = jest.fn();

    let container: HTMLElement | undefined;

    await act(async () => {
      container = render(
        <DynamicSearchCreatableInput
          dataTestId='DATA-TEST-ID'
          fieldSize={4}
          handleCreate={handleCreateMock}
          isInError
          name='SELECT'
          noOptionsMessage={noOptionsMessageMock}
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
          usePortal={false}
        />,
      ).container;

      expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();
    });

    expect(container).toMatchSnapshot();
    expect(handleCreateMock).toBeCalledTimes(0);
    expect(resolveValueMock).toBeCalledTimes(0);
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
  });

  it('DynamicSearchCreatableInput handles inputValue change', async () => {
    const handleCreateMock = jest.fn();
    const noOptionsMessageMock = jest.fn();
    const onChangeMock = jest.fn();
    const resolveValueMock = jest.fn().mockImplementation((input) => {
      if (input === 'OPTION1') return Promise.resolve({ value: 'OPTION1', label: 'option 1' });
      if (input === 'OPTION2') return Promise.resolve({ value: 'OPTION2', label: 'option 2' });
      return Promise.resolve(undefined);
    });
    const searchOptionsMock = jest.fn();

    let container: RenderResult | undefined;

    await act(async () => {
      container = render(
        <DynamicSearchCreatableInput
          dataTestId='DATA-TEST-ID'
          handleCreate={handleCreateMock}
          inputValue={'OPTION1'}
          name='SELECT'
          noOptionsMessage={noOptionsMessageMock}
          onChange={onChangeMock}
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
        />,
      );

      expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    });

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container?.container).toMatchSnapshot();
    expect(handleCreateMock).toBeCalledTimes(0);
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(resolveValueMock).toBeCalledWith('OPTION1');
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
    expect(onChangeMock).toBeCalledTimes(0);

    await act(async () => {
      container?.rerender(
        <DynamicSearchCreatableInput
          dataTestId='DATA-TEST-ID'
          handleCreate={handleCreateMock}
          inputValue={'OPTION2'}
          name='SELECT'
          noOptionsMessage={noOptionsMessageMock}
          onChange={onChangeMock}
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
        />,
      );

      expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    });

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container?.container).toMatchSnapshot();
    expect(handleCreateMock).toBeCalledTimes(0);
    expect(resolveValueMock).toBeCalledTimes(2);
    expect(resolveValueMock).toBeCalledWith('OPTION2');
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
    expect(onChangeMock).toBeCalledTimes(0);
  });

  it('DynamicSearchCreatableInput handles change to undefined', async () => {
    const handleCreateMock = jest.fn();
    const noOptionsMessageMock = jest.fn();
    const onChangeMock = jest.fn();
    const resolveValueMock = jest.fn().mockImplementation((input) => {
      if (input === 'OPTION1') return Promise.resolve({ value: 'OPTION1', label: 'option 1' });
      return Promise.resolve(undefined);
    });
    const searchOptionsMock = jest.fn().mockImplementation(() => {
      return Promise.resolve(undefined);
    });

    let container: HTMLElement | undefined;

    await act(async () => {
      container = render(
        <DynamicSearchCreatableInput
          dataTestId='DATA-TEST-ID'
          handleCreate={handleCreateMock}
          inputValue={'OPTION1'}
          isClearable
          name='SELECT'
          noOptionsMessage={noOptionsMessageMock}
          onChange={onChangeMock}
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
        />,
      ).container;

      expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    });

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(handleCreateMock).toBeCalledTimes(0);
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(resolveValueMock).toBeCalledWith('OPTION1');
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
    expect(onChangeMock).toBeCalledTimes(0);

    await act(async () => {
      const select = await screen.findByRole('combobox');
      expect(select).not.toBeUndefined();
      if (select) {
        userEvent.type(select, '{backspace}');
      }
    });

    expect(container).toMatchSnapshot();
    expect(handleCreateMock).toBeCalledTimes(0);
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(resolveValueMock).toBeCalledWith('OPTION1');
    expect(noOptionsMessageMock).toBeCalledTimes(2);
    expect(searchOptionsMock).toBeCalledTimes(0);
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith(undefined);
  });

  it('DynamicSearchCreatableInput handles creation', async () => {
    const handleCreateMock = jest.fn().mockImplementation(() => {
      return Promise.resolve({ value: 'OPTION-CREATED', label: 'option created' });
    });
    const noOptionsMessageMock = jest.fn();
    const onChangeMock = jest.fn();
    const resolveValueMock = jest.fn();
    const searchOptionsMock = jest.fn().mockImplementation(() => {
      return Promise.resolve(undefined);
    });

    let container: HTMLElement | undefined;

    await act(async () => {
      container = render(
        <DynamicSearchCreatableInput
          dataTestId='DATA-TEST-ID'
          handleCreate={handleCreateMock}
          isClearable
          name='SELECT'
          noOptionsMessage={noOptionsMessageMock}
          onChange={onChangeMock}
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
        />,
      ).container;

      expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();
    });

    expect(container).toMatchSnapshot();
    expect(handleCreateMock).toBeCalledTimes(0);
    expect(handleCreateMock).toBeCalledTimes(0);
    expect(resolveValueMock).toBeCalledTimes(0);
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
    expect(onChangeMock).toBeCalledTimes(0);

    await act(async () => {
      const select = await screen.findByRole('combobox');
      expect(select).not.toBeUndefined();
      if (select) {
        userEvent.type(select, 'abc');
      }
    });

    await act(async () => {
      const select = await screen.findByRole('combobox');
      expect(select).not.toBeUndefined();
      if (select) {
        userEvent.type(select, '{arrowdown}{enter}');
      }
    });

    expect(container).toMatchSnapshot();
    expect(handleCreateMock).toBeCalledTimes(1);
    expect(handleCreateMock).toBeCalledWith('abc');
    expect(resolveValueMock).toBeCalledTimes(0);
    expect(noOptionsMessageMock).toBeCalledTimes(1);
    expect(searchOptionsMock).toBeCalledTimes('abc'.length);
    expect(searchOptionsMock).toBeCalledWith('abc', expect.any(Function));
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith('OPTION-CREATED');
  });

  it('DynamicSearchCreatableInput handles creation with undefined result', async () => {
    const handleCreateMock = jest.fn().mockImplementation(() => {
      return Promise.resolve(undefined);
    });
    const noOptionsMessageMock = jest.fn();
    const onChangeMock = jest.fn();
    const resolveValueMock = jest.fn();
    const searchOptionsMock = jest.fn().mockImplementation(() => {
      return Promise.resolve(undefined);
    });

    let container: HTMLElement | undefined;

    await act(async () => {
      container = render(
        <DynamicSearchCreatableInput
          dataTestId='DATA-TEST-ID'
          handleCreate={handleCreateMock}
          isClearable
          name='SELECT'
          noOptionsMessage={noOptionsMessageMock}
          onChange={onChangeMock}
          resolveValue={resolveValueMock}
          searchOptions={searchOptionsMock}
        />,
      ).container;

      expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();
    });

    expect(container).toMatchSnapshot();
    expect(handleCreateMock).toBeCalledTimes(0);
    expect(handleCreateMock).toBeCalledTimes(0);
    expect(resolveValueMock).toBeCalledTimes(0);
    expect(noOptionsMessageMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
    expect(onChangeMock).toBeCalledTimes(0);

    await act(async () => {
      const select = await screen.findByRole('combobox');
      expect(select).not.toBeUndefined();
      if (select) {
        userEvent.type(select, 'abc');
      }
    });

    await act(async () => {
      const select = await screen.findByRole('combobox');
      expect(select).not.toBeUndefined();
      if (select) {
        userEvent.type(select, '{arrowdown}{enter}');
      }
    });

    expect(container).toMatchSnapshot();
    expect(handleCreateMock).toBeCalledTimes(1);
    expect(handleCreateMock).toBeCalledWith('abc');
    expect(resolveValueMock).toBeCalledTimes(0);
    expect(noOptionsMessageMock).toBeCalledTimes(1);
    expect(searchOptionsMock).toBeCalledTimes('abc'.length);
    expect(searchOptionsMock).toBeCalledWith('abc', expect.any(Function));
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith(undefined);
  });
});
