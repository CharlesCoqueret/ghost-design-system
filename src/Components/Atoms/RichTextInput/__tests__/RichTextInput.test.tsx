import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import 'jest-canvas-mock';

describe('RichTextInput Component', () => {
  it('RichTextInput renders', () => {
    const RichTextInput = require('../RichTextInput').default;
    const onChangeMock = jest.fn();

    const { container } = render(<RichTextInput name='SELECT' onChange={onChangeMock} />);

    expect(container).toMatchSnapshot();
  });

  it('RichTextInput renders with image', () => {
    const RichTextInput = require('../RichTextInput').default;
    const onChangeMock = jest.fn();

    const { container } = render(<RichTextInput enableImage name='SELECT' onChange={onChangeMock} />);

    expect(container).toMatchSnapshot();
  });

  it('RichTextInput renders with image and link with maxLendth', () => {
    const RichTextInput = require('../RichTextInput').default;
    const onChangeMock = jest.fn();

    const { container } = render(
      <RichTextInput enableImage enableLink maxLength={100} name='SELECT' onChange={onChangeMock} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('RichTextInput renders with link in readOnly', () => {
    const RichTextInput = require('../RichTextInput').default;
    const onChangeMock = jest.fn();

    const { container } = render(<RichTextInput readOnly enableLink name='SELECT' onChange={onChangeMock} />);

    expect(container).toMatchSnapshot();
  });

  it('RichTextInput renders in readOnly with input', () => {
    const RichTextInput = require('../RichTextInput').default;
    const onChangeMock = jest.fn();

    const { container } = render(<RichTextInput readOnly input='TEST' name='SELECT' onChange={onChangeMock} />);

    expect(container).toMatchSnapshot();
  });

  it('RichTextInput handles changes', async () => {
    jest.resetModules();
    let onBlurCallback: (event: FocusEvent, newValue: string) => void = () => {
      return;
    };
    jest.mock('suneditor-react', () =>
      Object.assign(
        (props: { onBlur: typeof onBlurCallback }): ReactElement => {
          onBlurCallback = props.onBlur;
          return <div>{JSON.stringify(props)}</div>;
        },
        { displayName: 'MockSunEditorReact' },
      ),
    );

    const RichTextInput = require('../RichTextInput').default;
    const onChangeMock = jest.fn();

    const { container } = render(<RichTextInput name='SELECT' onChange={onChangeMock} />);

    expect(onBlurCallback).not.toBeUndefined();

    if (onBlurCallback) {
      onBlurCallback(
        new FocusEvent('event'),
        '<img src="http://test.com/logo.png" /> TEST <img src="data:test" /> TEST <img />',
      );
    }

    expect(onChangeMock).toHaveBeenCalledTimes(1);

    expect(onChangeMock).toBeCalledWith(
      '<img src="data:image/png;base64,00"> TEST <img src="data:test"> TEST <img src="data:image/png;base64,00">',
    );

    expect(container).toMatchSnapshot();
  });

  it('RichTextInput handles changes without IconvertImagesToBase64', async () => {
    jest.resetModules();
    let onBlurCallback: (event: FocusEvent, newValue: string) => void = () => {
      return;
    };
    jest.mock('suneditor-react', () =>
      Object.assign(
        (props: { onBlur: typeof onBlurCallback }): ReactElement => {
          onBlurCallback = props.onBlur;
          return <div>{JSON.stringify(props)}</div>;
        },
        { displayName: 'MockSunEditorReact' },
      ),
    );

    const RichTextInput = require('../RichTextInput').default;
    const onChangeMock = jest.fn();

    const { container } = render(<RichTextInput name='SELECT' onChange={onChangeMock} convertImagesToBase64={false} />);

    expect(onBlurCallback).not.toBeUndefined();

    if (onBlurCallback) {
      onBlurCallback(new FocusEvent('event'), '<img src="http://test.com/logo.png" /> TEST');
    }

    expect(onChangeMock).toHaveBeenCalledTimes(1);

    expect(onChangeMock).toBeCalledWith('<img src="http://test.com/logo.png" /> TEST');

    expect(container).toMatchSnapshot();
  });

  it('RichTextInput handles changes without onChange', () => {
    jest.resetModules();
    let onBlurCallback: (event: FocusEvent, newValue: string) => void = () => {
      return;
    };
    jest.mock('suneditor-react', () =>
      Object.assign(
        (props: { onBlur: typeof onBlurCallback }): ReactElement => {
          onBlurCallback = props.onBlur;
          return <div>{JSON.stringify(props)}</div>;
        },
        { displayName: 'MockSunEditorReact' },
      ),
    );

    const RichTextInput = require('../RichTextInput').default;

    const { container } = render(<RichTextInput name='SELECT' />);

    expect(onBlurCallback).not.toBeUndefined();

    if (onBlurCallback) {
      onBlurCallback(new FocusEvent('event'), '<img src="http://test.com/logo.png" /> TEST');
    }

    expect(container).toMatchSnapshot();
  });
});
