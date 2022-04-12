import React, { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import * as yup from 'yup';
import { AnyObject } from 'yup/lib/types';

import Form from './Form';
import { IFieldAndLayoutProps, IFormSubmitReturnedType, IUseFormReturnedType } from './types';
import { yupResolver, FieldError } from './yupResolver';
import { useRunAfterUpdate } from '../../../hooks';

export interface IUseFormProps<T extends AnyObject> {
  initialData: T;
  fields: Array<IFieldAndLayoutProps<T>>;
  previousData?: T;
  usePortal?: boolean;
  validationSchema?: yup.SchemaOf<T>;
}

const useForm = <T extends AnyObject>(props: IUseFormProps<T>): IUseFormReturnedType<T> => {
  const { fields, initialData, previousData, usePortal, validationSchema } = props;

  const [currentData, setCurrentData] = useState<T>(cloneDeep(initialData));
  const [isModified, setIsModified] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<Partial<Record<keyof T, FieldError>>>();
  const runAfterUpdate = useRunAfterUpdate();

  const handleDataChange = (dataIndex: keyof T, newValue: T[keyof T]): void => {
    setCurrentData((prev) => {
      prev[dataIndex] = newValue;
      return { ...prev };
    });

    setValidationError((prev) => {
      if (prev === undefined) return;
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
    setValidationError(undefined);
    setIsModified(false);
  };

  const scrollToError = () => {
    const errors = document.getElementsByClassName('field-error-message');
    errors.item(0)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
        fields={fields}
        handleDataChange={handleDataChange}
        initialData={currentData}
        validationError={validationError}
        previousData={previousData}
        validationSchema={validationSchema}
        usePortal={usePortal}
      />
    ),
    getData,
    isModified: () => isModified,
    reset,
    submit,
  };
};

useForm.defaultProps = {
  previousData: undefined,
  validationSchema: undefined,
  usePortal: true,
};

export default useForm;
