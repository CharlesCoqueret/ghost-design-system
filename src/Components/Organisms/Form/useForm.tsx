import React, { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import * as yup from 'yup';
import { AnyObject } from 'yup/lib/types';

import Form from './Form';
import { IFieldAndLayoutProps, IFormSubmitReturnedType, IUseFormReturnedType } from './types';
import { yupResolver, FieldError } from './yupResolver';
import { useRunAfterUpdate } from '../../../hooks';

export interface IUseFormProps<T extends AnyObject> {
  enableOldData?: boolean;
  enableSideBySide?: boolean;
  fields: Array<IFieldAndLayoutProps<T>>;
  initialData: T;
  onChangeNotification?: () => void;
  previousData?: T;
  usePortal?: boolean;
  validationSchema?: yup.SchemaOf<T>;
}

const useForm = <T extends AnyObject>(props: IUseFormProps<T>): IUseFormReturnedType<T> => {
  const {
    enableOldData,
    enableSideBySide,
    fields,
    initialData,
    onChangeNotification,
    previousData,
    usePortal,
    validationSchema,
  } = props;

  const [currentData, setCurrentData] = useState<T>(cloneDeep(initialData));
  const [isModified, setIsModified] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<Partial<Record<keyof T, FieldError>>>();
  const runAfterUpdate = useRunAfterUpdate();

  const rehydrate = (newData?: T): void => {
    newData && setCurrentData(newData);
    setIsModified(false);
    setValidationError(undefined);
  };

  const handleDataChange = (dataIndex: keyof T, newValue: T[keyof T]): void => {
    setCurrentData((prev) => {
      prev[dataIndex] = newValue;
      return { ...prev };
    });

    if (onChangeNotification) {
      onChangeNotification();
    }

    setValidationError((prev) => {
      if (prev === undefined) return prev;
      delete prev[dataIndex];
      return { ...prev };
    });
    setIsModified(true);
  };

  const getData = () => {
    return cloneDeep(currentData);
  };

  const reset = () => {
    setCurrentData(cloneDeep(initialData));

    if (onChangeNotification) {
      onChangeNotification();
    }

    setValidationError(undefined);
    setIsModified(false);
  };

  const scrollToError = () => {
    const error = document.body.getElementsByClassName('field-error-message').item(0);
    if (!error) return;
    error.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const submit = (): IFormSubmitReturnedType<T> => {
    let isValid = true;
    if (validationSchema) {
      const errors = yupResolver(validationSchema, { strict: true, abortEarly: false }, currentData);
      isValid = errors === undefined;
      // Logging validation errors in case the developer has checked it.
      if (!isValid) console.error(errors);
      setValidationError(errors);
    }

    if (!isValid) {
      runAfterUpdate(scrollToError);
    }

    return { data: cloneDeep(currentData), valid: isValid };
  };

  return {
    formElement: (
      <Form
        enableOldData={enableOldData}
        enableSideBySide={enableSideBySide}
        fields={fields}
        handleDataChange={handleDataChange}
        initialData={currentData}
        validationError={validationError}
        previousData={previousData}
        validationSchema={validationSchema}
        usePortal={usePortal}
      />
    ),
    formProps: {
      enableOldData,
      enableSideBySide,
      fields,
      handleDataChange,
      initialData: currentData,
      validationError,
      previousData,
      validationSchema,
      usePortal,
    },
    getData,
    isModified: () => isModified,
    rehydrate,
    reset,
    submit,
  };
};

useForm.defaultProps = {
  enableOldData: undefined,
  enableSideBySide: undefined,
  onChangeNotification: undefined,
  previousData: undefined,
  validationSchema: undefined,
  usePortal: true,
};

export default useForm;
