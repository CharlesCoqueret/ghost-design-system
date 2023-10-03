import React from 'react';
import { render, screen } from '@testing-library/react';

import { DynamicSearchField } from '..';

describe('DynamicSearchField Component', () => {
  it('DynamicSearchField renders', async () => {
    const { container } = render(
      <DynamicSearchField
        dataTestId='DATA-TEST-ID'
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

  it('DynamicSearchField renders with values in readonly', async () => {
    const { container } = render(
      <DynamicSearchField
        dataTestId='DATA-TEST-ID'
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

  it('DynamicSearchField renders with values in disabled highligted', async () => {
    const { container } = render(
      <DynamicSearchField
        dataTestId='DATA-TEST-ID'
        disabled
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

  it('DynamicSearchField renders with values with fieldSize and inline', async () => {
    const { container } = render(
      <DynamicSearchField
        dataTestId='DATA-TEST-ID'
        fieldSize={6}
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
