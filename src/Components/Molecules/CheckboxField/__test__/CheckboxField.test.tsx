import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CheckboxField } from '../CheckboxField';

describe('CheckboxField Component', () => {
  it('CheckboxField renders and handles changes', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <CheckboxField
        dataTestId={'DATA-TEST-ID'}
        input={[
          {
            label: 'Label 1',
            value: 'VALUE1',
          },
        ]}
        onChange={onChangeMock}
      />,
    );
    expect(container).toMatchSnapshot();

    const label = await screen.findByTestId('DATA-TEST-ID-0');
    userEvent.click(label);

    expect(container).toMatchSnapshot();
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith([
      {
        checked: true,
        label: 'Label 1',
        value: 'VALUE1',
      },
    ]);
  });

  it('CheckboxField renders with values in readonly', () => {
    const { container } = render(
      <CheckboxField
        input={[
          {
            label: 'Label 1',
            value: 'VALUE1',
          },
        ]}
        readOnly
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('CheckboxField renders with values in disabled highligted', () => {
    const { container } = render(
      <CheckboxField
        input={[
          {
            label: 'Label 1',
            value: 'VALUE1',
            highlighted: true,
          },
          {
            label: 'Label 2',
            value: 'VALUE2',
            highlighted: false,
          },
          {
            label: 'Label 3',
            value: 'VALUE3',
          },
        ]}
        disabled
        highlighted
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('CheckboxField renders with values with fieldSize and inline', () => {
    const { container } = render(
      <CheckboxField
        input={[
          {
            label: 'Label 1',
            value: 'VALUE1',
            highlighted: true,
          },
        ]}
        inline
        errorMessage='ERROR'
        fieldSize={6}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
