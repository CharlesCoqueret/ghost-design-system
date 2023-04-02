import { act, renderHook } from '@testing-library/react-hooks/dom';

import * as yup from 'yup';

import useForm from '../useForm';

describe('useForm hook', () => {
  it('provides the right properties', () => {
    //scrollIntoView is not implemented in jsdom
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    const onChangeMock = jest.fn();
    const onSubmitMock = jest.fn();

    const values: { number?: number } = { number: 50 };

    const { result } = renderHook(
      (initialValue: { number?: number }) =>
        useForm<{ number?: number }>({
          values: initialValue,
          validationSchema: yup.object({ number: yup.number().required('Value for number is required') }),
          onChange: onChangeMock,
          onSubmit: onSubmitMock,
        }),
      { initialProps: { number: 50 } },
    );

    expect(result.current.fieldsProps.number).toEqual({
      errorMessage: undefined,
      input: values.number,
      mandatory: true,
      onChange: expect.any(Function),
      touched: false,
    });
    expect(result.current.hasBeenSubmitted).toEqual(false);
  });

  it('handles Submit', () => {
    //scrollIntoView is not implemented in jsdom
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    const onChangeMock = jest.fn();
    const onSubmitMock = jest.fn();

    const values: { number?: number } = { number: 50 };

    const { result } = renderHook(
      (initialValue: { number?: number }) =>
        useForm<{ number?: number }>({
          values: initialValue,
          validationSchema: yup.object({ number: yup.number().required('Value for number is required') }),
          onChange: onChangeMock,
          onSubmit: onSubmitMock,
        }),
      { initialProps: values },
    );

    // Simulate submit
    act(() => {
      result.current.submit();
    });

    expect(result.current.hasBeenSubmitted).toEqual(true);
    expect(onSubmitMock).toBeCalledTimes(1);
    expect(onSubmitMock).toBeCalledWith({ number: values.number });
  });

  it('handles Changes with error', () => {
    const onChangeMock = jest.fn();
    const onSubmitMock = jest.fn();

    let values: { number?: number } = { number: 50 };

    const { result, rerender } = renderHook(
      (initialValue: { number?: number }) =>
        useForm<{ number?: number }>({
          values: initialValue,
          validationSchema: yup.object({ number: yup.number().required('Value for number is required') }),
          onChange: onChangeMock,
          onSubmit: onSubmitMock,
        }),
      { initialProps: values },
    );

    // Simulate changes
    act(() => {
      result.current.fieldsProps.number?.onChange(undefined);
    });

    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith('number', undefined);

    values = { number: undefined };
    rerender(values);

    // Simulate submit to get the error
    act(() => {
      result.current.submit();
    });

    expect(result.current.fieldsProps.number).toEqual({
      errorMessage: 'Value for number is required',
      input: undefined,
      mandatory: true,
      onChange: expect.any(Function),
      touched: true,
    });
  });

  it('handles Reset', () => {
    const onChangeMock = jest.fn();
    const onSubmitMock = jest.fn();

    let values: { number?: number } = { number: 50 };

    const { result, rerender } = renderHook(
      (initialValue: { number?: number }) =>
        useForm<{ number?: number }>({
          values: initialValue,
          validationSchema: yup.object({ number: yup.number().required('Value for number is required') }),
          onChange: onChangeMock,
          onSubmit: onSubmitMock,
        }),
      { initialProps: values },
    );

    // Simulate changes
    act(() => {
      result.current.fieldsProps.number?.onChange(undefined);
    });

    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith('number', undefined);

    values = { number: undefined };
    rerender(values);

    // Simulate submit to get the error
    act(() => {
      result.current.submit();
    });

    expect(result.current.hasBeenSubmitted).toEqual(true);
    expect(result.current.fieldsProps.number).toEqual({
      errorMessage: 'Value for number is required',
      input: undefined,
      mandatory: true,
      onChange: expect.any(Function),
      touched: true,
    });

    // Simulate reset
    act(() => {
      result.current.reset();
    });

    expect(onChangeMock).toBeCalledTimes(1);

    expect(result.current.hasBeenSubmitted).toEqual(false);
    expect(result.current.fieldsProps.number).toEqual({
      errorMessage: undefined,
      input: undefined,
      mandatory: true,
      onChange: expect.any(Function),
      touched: false,
    });
  });
});
