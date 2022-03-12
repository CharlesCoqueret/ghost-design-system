import * as yup from 'yup';
import { AnyObject } from 'yup/lib/object';

export type FieldError = {
  type?: string;
  message: string;
};

const parseErrorSchema = (error: yup.ValidationError) => {
  return (error.inner || []).reduce<Record<string, FieldError | undefined>>((previous, error) => {
    if (error.path && !previous[error.path]) {
      previous[error.path] = { type: error.type, message: error.message };
    }

    return previous;
  }, {});
};

export const yupResolver = <T extends AnyObject>(
  schema: yup.SchemaOf<T>,
  schemaOptions = {},
  values: T,
): Record<keyof T, FieldError> | undefined => {
  try {
    schema.validateSync(values, schemaOptions);

    return undefined;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return parseErrorSchema(error) as Record<keyof T, FieldError>;
    } else {
      throw error;
    }
  }
};
