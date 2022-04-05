import React from 'react';
import { GenericField } from '..';
import { render } from '@testing-library/react';

describe('GenericField Component', () => {
  it('GenericField renders', () => {
    const { container } = render(<GenericField />);

    expect(container).toMatchSnapshot();
  });

  it('GenericField renders with children', () => {
    const { container } = render(
      <GenericField>
        <div className='CHILD-TEST' />
      </GenericField>,
    );

    expect(container).toMatchSnapshot();
  });

  it('GenericField renders inline with error message, not displaying the error', () => {
    const { container } = render(<GenericField inline errorMessage='ERROR-MESSAGE' maxLength={10} />);

    expect(container).toMatchSnapshot();
  });

  it('GenericField renders with error message', () => {
    const { container } = render(<GenericField errorMessage='ERROR-MESSAGE' />);

    expect(container).toMatchSnapshot();
  });

  it('GenericField renders with error message in read only, not displaying the error', () => {
    const { container } = render(<GenericField readOnly errorMessage='ERROR-MESSAGE' maxLength={10} />);

    expect(container).toMatchSnapshot();
  });

  it('GenericField renders with error message in read only, not displaying the error, only displaying the helper text', () => {
    const { container } = render(
      <GenericField readOnly helperText='HELPER-TEXT' errorMessage='ERROR-MESSAGE' maxLength={10} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('GenericField renders with error message and helper text, displaying only error', () => {
    const { container } = render(<GenericField helperText='HELPER-TEXT' errorMessage='ERROR-MESSAGE' maxLength={10} />);

    expect(container).toMatchSnapshot();
  });

  it('GenericField renders with helper text and counter', () => {
    const { container } = render(<GenericField helperText='HELPER-TEXT' inputLength={5} maxLength={10} />);

    expect(container).toMatchSnapshot();
  });

  it('GenericField renders with highlight in readonly', () => {
    const { container } = render(<GenericField readOnly highlighted />);

    expect(container).toMatchSnapshot();
  });

  it('GenericField renders with highlight not in readonly', () => {
    const { container } = render(<GenericField highlighted />);

    expect(container).toMatchSnapshot();
  });

  it('GenericField renders with invertInputDescription', () => {
    const { container, rerender } = render(
      <GenericField helperText='HELPER' invertInputDescription>
        CHILD
      </GenericField>,
    );

    expect(container).toMatchSnapshot();

    rerender(<GenericField helperText='HELPER'>CHILD</GenericField>);
    expect(container).toMatchSnapshot();
  });
});
