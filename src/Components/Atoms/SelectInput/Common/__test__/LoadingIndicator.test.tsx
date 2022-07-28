import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactSelect from 'react-select';
import LoadingIndicator from '../LoadingIndicator';

const DATA_TEST_ID = 'DATA-TEST-ID';

describe('LoadingIndicator Component', () => {
  it('LoadingIndicator renders', async () => {
    const { container } = render(
      <ReactSelect components={{ LoadingIndicator }} isLoading={true} data-testid={DATA_TEST_ID} />,
    );

    const dataTestId = `${DATA_TEST_ID}-spinner`;
    const attributes = (await screen.findByTestId(dataTestId)).attributes;
    expect(attributes).toBeTruthy();
    expect(attributes.getNamedItem('data-testid')?.value).toEqual(dataTestId);
    expect(attributes.getNamedItem('icon')?.value).toEqual('fal,spinner');

    expect(container).toMatchSnapshot();
  });
});
