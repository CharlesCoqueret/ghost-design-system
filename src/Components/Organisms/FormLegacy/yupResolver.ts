import * as yup from 'yup';

const parseErrorSchema = <T>(error: yup.ValidationError) => {
  return (error.inner || []).reduce<Partial<Record<keyof T, string | undefined>>>((previous, error) => {
    if (error.path && !previous[error.path as keyof T]) {
      previous[error.path as keyof T] = error.message;
    }

    return previous;
  }, {});
};

export const yupResolver = <T extends yup.AnyObject>(
  schema: yup.ObjectSchema<T>,
  schemaOptions = {},
  values: T,
): Partial<Record<keyof T, string | undefined>> | undefined => {
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
        return parseErrorSchema(error as yup.ValidationError);
      } catch {
        console.error('Error with incorrect type that could not be resolved');
      }
    }
  }
  return undefined;
};
