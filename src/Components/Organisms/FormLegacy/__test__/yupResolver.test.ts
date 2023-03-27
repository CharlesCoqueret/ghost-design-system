import * as yup from 'yup';

import { yupResolver } from '../yupResolver';

describe('yupResolver', () => {
  it('yupResolver validates without errors', () => {
    const schema = yup.object({ number: yup.number().required() });
    const values = { number: 10 };

    expect(yupResolver(schema, undefined, values)).toStrictEqual(undefined);
  });

  it('yupResolver validates with errors', () => {
    const schema = yup.object({ number: yup.number().required('Value for number is required') });
    const values = {};

    expect(yupResolver(schema, { strict: true, abortEarly: false }, values)).toStrictEqual({
      number: 'Value for number is required',
    });
  });

  it('yupResolver validates with unconventional errors', () => {
    console.error = jest.fn();

    const schema = yup.object({ number: yup.number().required('Value for number is required') });
    Object.assign(schema, {
      validateSync: () => {
        throw Error;
      },
    });
    const values = {};

    expect(yupResolver(schema, { strict: true, abortEarly: false }, values)).toStrictEqual({});

    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toBeCalledWith('Error with incorrect type:', Error, 'Trying to resolve it.');

    jest.clearAllMocks();
  });

  it('yupResolver validates with unusable errors', () => {
    console.error = jest.fn();

    const schema = yup.object({ number: yup.number().required('Value for number is required') });
    Object.assign(schema, {
      validateSync: () => {
        throw { inner: 5 };
      },
    });
    const values = {};

    expect(yupResolver(schema, { strict: true, abortEarly: false }, values)).toStrictEqual(undefined);

    expect(console.error).toBeCalledTimes(2);
    expect(console.error).toBeCalledWith('Error with incorrect type:', { inner: 5 }, 'Trying to resolve it.');
    expect(console.error).toBeCalledWith('Error with incorrect type that could not be resolved');

    jest.resetAllMocks();
  });
});
