import React, { ReactElement } from 'react';
import * as yup from 'yup';
import { AnyObject } from 'yup/lib/object';

import { IFieldProps } from './types';
import FormField from './FormField';
import { FieldError } from './yupResolver';
import { SchemaDescription, SchemaObjectDescription } from 'yup/lib/schema';

export interface IFormProps<T extends AnyObject> {
  fields: Array<IFieldProps<T>>;
  handleDataChange: (dataIndex: keyof T, newValue: T[keyof T]) => void;
  initialData: T;
  previousData?: T;
  validationError?: Record<keyof T, FieldError>;
  validationSchema?: yup.SchemaOf<T>;
}

const Form = <T,>(props: IFormProps<T>): ReactElement => {
  const { fields, handleDataChange, initialData, previousData, validationSchema, validationError } = props;

  return (
    <>
      {fields.map((field) => {
        let isRequired = false;

        try {
          const objectDescription = validationSchema?.describe() as SchemaObjectDescription;
          const schemaDescription = objectDescription?.fields[field.dataIndex as string] as SchemaDescription;
          isRequired = schemaDescription.tests.some((test) => test?.name === 'required');
        } catch {}

        return (
          <FormField<T>
            key={field.label}
            field={field}
            data={initialData}
            previousData={previousData}
            handleChange={handleDataChange}
            validationError={validationError}
            requiredFromValidation={isRequired}
          />
        );
      })}
    </>
  );
};

export default Form;
