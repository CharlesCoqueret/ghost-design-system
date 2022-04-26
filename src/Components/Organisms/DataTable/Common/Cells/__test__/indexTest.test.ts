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
jest.mock('suneditor-react', () => {});
jest.mock('suneditor-react/dist', () => {});
jest.mock('suneditor-react/dist/types/lang', () => {});

import * as all from '../index';

describe('Cell index', () => {
  it('Export correctly', () => {
    expect(all.AmountCell).toBeDefined();
    expect(all.BadgeCell).toBeDefined();
    expect(all.ButtonCell).toBeDefined();
    expect(all.CheckboxCell).toBeDefined();
    expect(all.CodeCell).toBeDefined();
    expect(all.CustomCell).toBeDefined();
    expect(all.DateCell).toBeDefined();
    expect(all.DescriptionCell).toBeDefined();
    expect(all.DynamicSearchCell).toBeDefined();
    expect(all.FileCell).toBeDefined();
    expect(all.MultiSelectCell).toBeDefined();
    expect(all.NumberCell).toBeDefined();
    expect(all.PercentageCell).toBeDefined();
    expect(all.RichTextCell).toBeDefined();
    expect(all.SectionCell).toBeDefined();
    expect(all.SwitchCell).toBeDefined();
    expect(all.TableCell).toBeDefined();
    expect(all.TextCell).toBeDefined();
    expect(all.TextAreaCell).toBeDefined();
    expect(all.YearCell).toBeDefined();
  });
});
