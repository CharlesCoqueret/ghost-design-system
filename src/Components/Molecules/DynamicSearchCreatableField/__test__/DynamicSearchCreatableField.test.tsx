import React from 'react';
import { render, screen } from '@testing-library/react';

import { DynamicSearchCreatableField } from '..';

describe('DynamicSearchCreatableField Component', () => {
  it('DynamicSearchCreatableField renders', async () => {
    const { container } = render(
      <DynamicSearchCreatableField
        dataTestId='DATA-TEST-ID'
        handleCreate={jest.fn()}
        name='name'
        noOptionsMessage='no options'
        resolveValue={() => {
          return Promise.resolve(undefined);
        }}
        searchOptions={() => {
          return Promise.resolve([]);
        }}
      />,
    );
    expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
  });

  it('DynamicSearchCreatableField renders with values in readonly', async () => {
    const { container } = render(
      <DynamicSearchCreatableField
        dataTestId='DATA-TEST-ID'
        handleCreate={jest.fn()}
        input={'VALUE1'}
        name='name'
        noOptionsMessage='no options'
        readOnly
        resolveValue={() => {
          return Promise.resolve({ value: 'VALUE1', label: 'Label 1' });
        }}
        searchOptions={() => {
          return Promise.resolve([]);
        }}
      />,
    );
    expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
  });

  it('DynamicSearchCreatableField renders with values in disabled highligted', async () => {
    const { container } = render(
      <DynamicSearchCreatableField
        dataTestId='DATA-TEST-ID'
        disabled
        handleCreate={jest.fn()}
        highlighted
        input={'VALUE1'}
        name='name'
        noOptionsMessage='no options'
        resolveValue={() => {
          return Promise.resolve({ value: 'VALUE1', label: 'Label 1' });
        }}
        searchOptions={() => {
          return Promise.resolve([]);
        }}
      />,
    );
    expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
  });

  it('DynamicSearchCreatableField renders with values with fieldSize and inline', async () => {
    const { container } = render(
      <DynamicSearchCreatableField
        dataTestId='DATA-TEST-ID'
        fieldSize={6}
        handleCreate={jest.fn()}
        inline
        input={'VALUE1'}
        name='name'
        noOptionsMessage='no options'
        resolveValue={() => {
          return Promise.resolve({ value: 'VALUE1', label: 'Label 1' });
        }}
        searchOptions={() => {
          return Promise.resolve([]);
        }}
      />,
    );
    expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();
    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
  });
});
