import * as yup from 'yup';
import { AnyObject } from 'yup/lib/object';

export type FieldError = {
  type?: string;
  message: string;
};

const parseErrorSchema = <T>(error: yup.ValidationError) => {
  return (error.inner || []).reduce<Partial<Record<keyof T, FieldError | undefined>>>((previous, error) => {
    if (error.path && !previous[error.path as keyof T]) {
      previous[error.path as keyof T] = { type: error.type, message: error.message };
    }

    return previous;
  }, {});
};

export const yupResolver = <T extends AnyObject>(
  schema: yup.SchemaOf<T>,
  schemaOptions = {},
  values: T,
): Partial<Record<keyof T, FieldError | undefined>> | undefined => {
  try {
    schema.validateSync(values, schemaOptions);
  } catch (error) {
    // If error if of yup.ValidationError type
    if (error instanceof yup.ValidationError) {
      return parseErrorSchema(error);
    }
    // Else, we will try to resolve it and logging it.
    else {
      console.error('Error with incorrect type:', error, 'Trying to resolve it.');
      try {
        return parseErrorSchema(error as yup.ValidationError) as Record<keyof T, FieldError>;
      } catch {
        console.error('Error with incorrect that could not be resolved');
      }
    }
  }
  return undefined;
};
