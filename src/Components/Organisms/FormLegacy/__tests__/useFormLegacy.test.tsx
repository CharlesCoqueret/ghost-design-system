import React from 'react';
import { act, render, renderHook } from '@testing-library/react';

import * as yup from 'yup';
import { FieldLegacyTypeEnum } from '../types';

let handleDataChangeForm: ((dataIndex: string, newValue: number | undefined) => void) | undefined;

jest.mock('../FormLegacy', () => {
  return {
    __esModule: true,
    default: (props: { handleDataChange: typeof handleDataChangeForm; validationError?: Record<string, unknown> }) => {
      if (props.handleDataChange) handleDataChangeForm = props.handleDataChange;
      return (
        <>
          <div>Mocked Form props: {JSON.stringify(props)}</div>
          {props.validationError && <div className='field-error' />}
        </>
      );
    },
  };
});

import useFormLegacy from '../useFormLegacy';

describe('useFormLegacy hook', () => {
  it('provides the right elements', () => {
    //scrollIntoView is not implemented in jsdom
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    console.error = jest.fn();

    const { result } = renderHook(() =>
      useFormLegacy({
        initialData: { number: 50 },
        fields: [{ fieldType: FieldLegacyTypeEnum.NUMBER, dataIndex: 'number', label: 'Number' }],
        previousData: { number: 0 },
        validationSchema: yup.object({ number: yup.number().required('Value for number is required') }),
      }),
    );

    const { container, rerender } = render(result.current.formElement);
    expect(container).toMatchSnapshot();
    expect(result.current.getData()).toEqual({ number: 50 });
    expect(result.current.isModified()).toEqual(false);

    act(() => {
      if (handleDataChangeForm) {
        handleDataChangeForm('number', undefined);
      }
    });
    rerender(result.current.formElement);
    expect(result.current.getData()).toEqual({ number: undefined });
    expect(result.current.isModified()).toEqual(true);
    expect(container).toMatchSnapshot();

    act(() => {
      expect(result.current.submit()).toEqual({ valid: false, data: { number: undefined } });
    });
    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toBeCalledWith({ number: 'Value for number is required' });

    rerender(result.current.formElement);
    act(() => {
      // Running once more as the rerender is managed manually.
      result.current.submit();
    });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(window.HTMLElement.prototype.scrollIntoView).toBeCalledTimes(1);
    expect(container).toMatchSnapshot();
    expect(console.error).toBeCalledTimes(2);

    act(() => {
      if (handleDataChangeForm) {
        handleDataChangeForm('number', 100);
      }
    });
    rerender(result.current.formElement);
    expect(container).toMatchSnapshot();
    expect(result.current.getData()).toEqual({ number: 100 });
    expect(result.current.isModified()).toEqual(true);

    act(() => {
      expect(result.current.submit()).toEqual({ valid: true, data: { number: 100 } });
    });
    rerender(result.current.formElement);
    expect(container).toMatchSnapshot();
    expect(result.current.getData()).toEqual({ number: 100 });
    expect(result.current.isModified()).toEqual(true);

    act(() => {
      result.current.reset();
    });
    rerender(result.current.formElement);
    expect(container).toMatchSnapshot();
    expect(result.current.getData()).toEqual({ number: 50 });
    expect(result.current.isModified()).toEqual(false);
  });
});
