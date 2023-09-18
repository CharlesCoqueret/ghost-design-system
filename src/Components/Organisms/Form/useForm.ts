import { useEffect, useState } from 'react';
import * as yup from 'yup';

import { useRunAfterUpdate } from '../../../hooks';

type FieldProps<K extends keyof T, T> = {
  [key in K]: {
    /** Current value of the field */
    input: T[key];
    /** Callback on change of the field */
    onChange: (value?: T[key]) => void;
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
  submit: (event?: React.FormEvent<HTMLFormElement>) => void;
  /** Handler for the reset of the form, especially the touched, hasBeenSubmitted and the errors. */
  reset: () => void;
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

const parseErrorSchema = <T>(e: yup.ValidationError) => {
  const newErrors = {} as Record<keyof T, string>;
  e.inner.forEach((error) => {
    if (error.path && !newErrors[error.path as keyof T]) {
      newErrors[error.path as keyof T] = error.message;
    }
  });
  return newErrors;
};

const yupErrorResolver = <T extends yup.AnyObject>(
  validationSchema: yup.ObjectSchema<T>,
  values: T,
): Record<keyof T, string> => {
  try {
    validationSchema.validateSync(values, { abortEarly: false });
  } catch (e) {
    // If error is yup.ValidationError type
    if (e instanceof yup.ValidationError) {
      return parseErrorSchema(e);
    }
    // Else, we will try to resolve it and logging it.
    else {
      console.error('Error with incorrect type:', e, 'Trying to resolve it.');
      try {
        return parseErrorSchema(e as yup.ValidationError);
      } catch {
        console.error('Error with incorrect type that could not be resolved');
      }
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
      if (process.env.NODE_ENV === 'development') {
        console.error(
          `could not retrieve if ${dataIndex} is mandatory.` +
            ` It looks like you haven't defined a proper validation schema.`,
        );
      }
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

  /** Ensures the mandatory marker and errors are defined whenever the values change */
  useEffect(() => {
    validate();
  }, [values]);

  const validate = () => {
    setErrors(yupErrorResolver(validationSchema, values));
    setMandatory(yupMandatoryResolver(validationSchema, values));
  };

  const handleChange =
    <K extends keyof T>(fieldName: K) =>
    (value: T[K]) => {
      validate();
      setTouched((prev) => {
        return { ...prev, [fieldName]: true };
      });
      onChange(fieldName, value);
    };

  const submit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    validate();
    setHasBeenSubmitted(true);
    if (onSubmit && Object.keys(errors).length === 0) {
      onSubmit(values);
    } else {
      runAfterUpdate(scrollToError);
    }
  };

  const reset = () => {
    setHasBeenSubmitted(false);
    setTouched({} as Record<keyof T, boolean>);
    setErrors({} as Record<keyof T, string>);
  };

  const fieldsProps = Object.entries(values).reduce(
    (acc, [fieldName, value]) => {
      return {
        ...acc,
        [fieldName]: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          input: value,
          onChange: handleChange(fieldName),
          errorMessage: errors[fieldName],
          touched: touched[fieldName] || false,
          mandatory: mandatory[fieldName] || false,
        },
      };
    },
    {} as FieldProps<keyof T, T>,
  );

  return {
    fieldsProps,
    submit,
    reset,
    hasBeenSubmitted,
  };
};

export default useForm;
