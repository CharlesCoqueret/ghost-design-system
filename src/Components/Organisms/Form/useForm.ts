import { useState, useEffect, useCallback } from 'react';
import * as yup from 'yup';

import { useRunAfterUpdate } from '../../../hooks';

type FieldProps<K extends keyof T, T> = {
  [key in K]: {
    /** Current value of the field */
    input: T[key];
    /** Callback on change of the field */
    onChange: (value: T[key]) => void;
    /** Error message */
    errorMessage?: string;
    /** Indicator when the field has been modified by the user */
    touched: boolean;
  };
};

export interface IFormReturnedValues<T> {
  /** Object containing for each entry of the form object, the props for the field */
  fieldsProps: FieldProps<keyof T, T>;
  /** Handler for the submit, if there is no error, the onSubmit callback will be called it the form is valid. */
  handleSubmit: (event?: React.FormEvent<HTMLFormElement>) => void;
  /** Handler for the reset of the form, especially the touched, hasBeenSubmitted and the errors. */
  handleReset: () => void;
  /** Indicator when the form has already been submitted by the user */
  hasBeenSubmitted: boolean;
}

export interface IUseFormProps<T extends yup.AnyObject> {
  /** Values to be rendered in the form (and updated via the onChange callback) */
  values: T;
  /** Validation schema */
  validationSchema: yup.ObjectSchema<T>;
  /** Callback to be used when the form is valid according to the validation schema */
  onSubmit?: (data: T) => void;
  /** Callback to be used to update the provided values */
  onChange: (field: keyof T, value: T[keyof T]) => void;
}

const yupErrorResolver = <T extends yup.AnyObject>(
  validationSchema: yup.ObjectSchema<T>,
  values: T,
): Record<keyof T, string> => {
  try {
    validationSchema.validateSync(values, { abortEarly: false });
  } catch (e) {
    if (e instanceof yup.ValidationError) {
      const newErrors = {} as Record<keyof T, string>;
      e.inner.forEach((error) => {
        if (error.path && !newErrors[error.path as keyof T]) {
          newErrors[error.path as keyof T] = error.message;
        }
      });
      return newErrors;
    }
  }
  return {} as Record<keyof T, string>;
};

const yupMandatoryResolver = <T extends yup.AnyObject>(
  validationSchema: yup.ObjectSchema<T>,
  values: T,
): Record<keyof T, boolean> => {
  const newErrors = {} as Record<keyof T, boolean>;
  const descriptor = validationSchema.describe({ value: values });
  for (const dataIndex in descriptor.fields) {
    try {
      const fieldDescriptor = descriptor.fields[dataIndex] as yup.SchemaDescription;
      newErrors[dataIndex as keyof T] = !fieldDescriptor.optional && !fieldDescriptor.nullable;
    } catch (error) {
      console.error(
        `could not retrieve if ${dataIndex} is mandatory.` +
          ` It looks like you haven't defined a proper validation schema.`,
      );
    }
  }
  return newErrors;
};

const scrollToError = () => {
  const firstError = document.body.getElementsByClassName('field-error').item(0);
  if (!firstError) return;
  firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

const useForm = <T extends yup.AnyObject>(props: IUseFormProps<T>): IFormReturnedValues<T> => {
  const { values, validationSchema, onSubmit, onChange } = props;

  /**
   * Touched tracks on the field bases of modifications.
   */
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);

  /**
   * Errors tracks on the field bases of validation error messages.
   */
  const [errors, setErrors] = useState<Record<keyof T, string>>({} as Record<keyof T, string>);

  /**
   * Mandatory tracks on the field bases of mandatory property evaluated from the validation Schema.
   */
  const [mandatory, setMandatory] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);

  /**
   * HasBeenSubmitted tracks the submission of the form.
   */
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

  const runAfterUpdate = useRunAfterUpdate();

  const validate = useCallback(() => {
    setErrors(yupErrorResolver(validationSchema, values));
    setMandatory(yupMandatoryResolver(validationSchema, values));
  }, [validationSchema, values]);

  /**
   * Validate the form whenever the incoming values are passed.
   */
  useEffect(() => {
    validate();
  }, [validate]);

  const handleChange =
    <K extends keyof T>(fieldName: K) =>
    (value: T[K]) => {
      setTouched((prev) => {
        return { ...prev, [fieldName]: true };
      });
      onChange(fieldName, value);
    };

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setHasBeenSubmitted(true);
    if (onSubmit && Object.keys(errors).length === 0) {
      onSubmit(values);
    } else {
      runAfterUpdate(scrollToError);
    }
  };

  const handleReset = () => {
    setHasBeenSubmitted(false);
    setTouched({} as Record<keyof T, boolean>);
    setErrors({} as Record<keyof T, string>);
  };

  const fieldsProps = Object.entries(values).reduce((acc, [fieldName, value]) => {
    return {
      ...acc,
      [fieldName]: {
        input: value,
        onChange: handleChange(fieldName),
        errorMessage: errors[fieldName],
        touched: touched[fieldName],
        mandatory: mandatory[fieldName],
      },
    };
  }, {} as FieldProps<keyof T, T>);

  return {
    fieldsProps,
    handleSubmit,
    handleReset,
    hasBeenSubmitted,
  };
};

export default useForm;
