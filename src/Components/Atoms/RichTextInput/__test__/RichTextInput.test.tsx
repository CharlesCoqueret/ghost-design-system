import React, { ReactElement } from 'react';
import { render, waitFor } from '@testing-library/react';
import 'jest-canvas-mock';

// Mocking suneditor
jest.mock('suneditor');
jest.mock('suneditor/src/plugins', () => ({}));
jest.mock('suneditor/src/plugins/submenu/align', () => ({ name: 'align' }));
jest.mock('suneditor/src/plugins/command/blockquote', () => ({ name: 'blockquote' }));
jest.mock('suneditor/src/plugins/submenu/fontColor', () => ({ name: 'fontColor' }));
jest.mock('suneditor/src/plugins/submenu/fontSize', () => ({ name: 'fontSize' }));
jest.mock('suneditor/src/plugins/submenu/formatBlock', () => ({ name: 'formatBlock' }));
jest.mock('suneditor/src/plugins/submenu/hiliteColor', () => ({ name: 'hiliteColor' }));
jest.mock('suneditor/src/plugins/submenu/horizontalRule', () => ({ name: 'horizontalRule' }));
jest.mock('suneditor/src/plugins/dialog/image', () => ({ name: 'image' }));
jest.mock('suneditor/src/plugins/dialog/link', () => ({ name: 'link' }));
jest.mock('suneditor/src/plugins/submenu/lineHeight', () => ({ name: 'lineHeight' }));
jest.mock('suneditor/src/plugins/submenu/list', () => ({ name: 'list' }));
jest.mock('suneditor/src/plugins/submenu/paragraphStyle', () => ({ name: 'paragraphStyle' }));
jest.mock('suneditor/src/plugins/submenu/table', () => ({ name: 'table' }));

jest.mock('suneditor-react', () => ({
  __esModule: true,
  default: (props: unknown): ReactElement => {
    return <div>{JSON.stringify(props)}</div>;
  },
}));

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

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledTimes(1);
    });

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

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledTimes(1);
    });

    expect(onChangeMock).toBeCalledWith('<img src="http://test.com/logo.png" /> TEST');

    expect(container).toMatchSnapshot();
  });

  it('RichTextInput handles changes without onChange', async () => {
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
