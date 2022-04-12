import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';

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

  it('RichTextInput renders in readOnly with inputValue', () => {
    const RichTextInput = require('../RichTextInput').default;
    const onChangeMock = jest.fn();

    const { container } = render(<RichTextInput readOnly inputValue='TEST' name='SELECT' onChange={onChangeMock} />);

    expect(container).toMatchSnapshot();
  });

  it('RichTextInput handles changes', () => {
    jest.resetModules();
    let onBlurCallback: (event: FocusEvent, newValue: string) => void = () => {
      return;
    };
    jest.mock('suneditor-react', () => (props: { onBlur: typeof onBlurCallback }): ReactElement => {
      onBlurCallback = props.onBlur;
      return <div>{JSON.stringify(props)}</div>;
    });

    const RichTextInput = require('../RichTextInput').default;
    const onChangeMock = jest.fn();

    const { container } = render(<RichTextInput name='SELECT' onChange={onChangeMock} />);

    expect(onBlurCallback).not.toBeUndefined();

    if (onBlurCallback) {
      onBlurCallback(new FocusEvent('event'), 'TEST');
    }

    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith('TEST');

    expect(container).toMatchSnapshot();
  });
});
