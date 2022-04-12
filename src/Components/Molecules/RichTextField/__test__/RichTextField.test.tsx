import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';

// Mocking suneditor which is problematic with Jest
jest.mock('suneditor', () => {});
jest.mock('suneditor/src/plugins/', () => {});
jest.mock('suneditor/src/plugins/submenu/align', () => {});
jest.mock('suneditor/src/plugins/command/blockquote', () => {});
jest.mock('suneditor/src/plugins/submenu/fontColor', () => {});
jest.mock('suneditor/src/plugins/submenu/fontSize', () => {});
jest.mock('suneditor/src/plugins/submenu/formatBlock', () => {});
jest.mock('suneditor/src/plugins/submenu/hiliteColor', () => {});
jest.mock('suneditor/src/plugins/submenu/horizontalRule', () => {});
jest.mock('suneditor/src/plugins/dialog/image', () => {});
jest.mock('suneditor/src/plugins/dialog/link', () => {});
jest.mock('suneditor/src/plugins/submenu/lineHeight', () => {});
jest.mock('suneditor/src/plugins/submenu/list', () => {});
jest.mock('suneditor/src/plugins/submenu/paragraphStyle', () => {});
jest.mock('suneditor/src/plugins/submenu/table', () => {});
jest.mock('suneditor-react/dist', () => {});
jest.mock('suneditor-react/dist/types/lang', () => {});
jest.mock('suneditor-react', () => ({
  __esModule: true,
  default: (props: unknown): ReactElement => {
    return <div>{JSON.stringify(props)}</div>;
  },
}));

import { RichTextField } from '..';

describe('RichTextField Component', () => {
  it('RichTextField renders', () => {
    const { container } = render(<RichTextField inputValue='rich text' name='name' />);
    expect(container).toMatchSnapshot();
  });

  it('RichTextField renders with values in readonly', () => {
    const { container } = render(<RichTextField inputValue='rich text' name='name' readOnly />);
    expect(container).toMatchSnapshot();
  });

  it('RichTextField renders with values in disabled highligted', () => {
    const { container } = render(<RichTextField inputValue='rich text' name='name' disabled />);
    expect(container).toMatchSnapshot();
  });

  it('RichTextField renders with values with fieldSize and inline', () => {
    const { container } = render(<RichTextField inputValue='rich text' name='name' inline fieldSize={6} />);
    expect(container).toMatchSnapshot();
  });
});
