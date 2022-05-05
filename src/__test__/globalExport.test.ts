import * as Global from '..';

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

describe('Global export test', () => {
  it('Atoms', () => {
    expect(Global.AmountInput).toBeDefined();
    expect(Global.ThousandsGroupStyle).toBeDefined();

    expect(Global.Badge).toBeDefined();
    expect(Global.BadgeColorsEnum).toBeDefined();

    expect(Global.CheckboxInput).toBeDefined();

    expect(Global.DateFormatEnum).toBeDefined();
    expect(Global.WeekDayEnum).toBeDefined();
    expect(Global.DatePickerInput).toBeDefined();
    expect(Global.YearPickerInput).toBeDefined();
    expect(Global.importFnsLocaleFile).toBeDefined();

    expect(Global.FileInput).toBeDefined();
    expect(Global.formatBytes).toBeDefined();
    expect(Global.FileStatusEnum).toBeDefined();

    expect(Global.GenericField).toBeDefined();
    expect(Global.GenericFieldLabel).toBeDefined();

    expect(Global.loadIcons).toBeDefined();
    expect(Global.Icon).toBeDefined();

    expect(Global.Col).toBeDefined();
    expect(Global.Row).toBeDefined();
    expect(Global.Section).toBeDefined();

    expect(Global.Link).toBeDefined();

    expect(Global.Modal).toBeDefined();
    expect(Global.ModalBody).toBeDefined();
    expect(Global.ModalFooter).toBeDefined();

    expect(Global.Portal).toBeDefined();

    expect(Global.Pulsar).toBeDefined();

    expect(Global.RichTextInput).toBeDefined();

    expect(Global.DynamicSearchCreatableInput).toBeDefined();
    expect(Global.DynamicSearchInput).toBeDefined();
    expect(Global.MultiSelectInput).toBeDefined();
    expect(Global.SelectInput).toBeDefined();

    expect(Global.SwitchInput).toBeDefined();

    expect(Global.TextAreaInput).toBeDefined();

    expect(Global.TextInput).toBeDefined();

    expect(Global.Tooltip).toBeDefined();
    expect(Global.MenuDirectionEnum).toBeDefined();

    expect(Global.Typography).toBeDefined();
  });

  it('Molecules', () => {
    expect(Global.AmountField).toBeDefined();

    expect(Global.Button).toBeDefined();
    expect(Global.ColorButtonEnum).toBeDefined();

    expect(Global.CheckboxField).toBeDefined();

    expect(Global.DatePickerField).toBeDefined();

    expect(Global.DynamicSearchCreatableField).toBeDefined();

    expect(Global.DynamicSearchField).toBeDefined();

    expect(Global.FileField).toBeDefined();

    expect(Global.MultiSelectField).toBeDefined();

    expect(Global.PercentageField).toBeDefined();

    expect(Global.Popover).toBeDefined();

    expect(Global.RichTextField).toBeDefined();

    expect(Global.SelectField).toBeDefined();

    expect(Global.SwitchField).toBeDefined();

    expect(Global.TextAreaField).toBeDefined();

    expect(Global.TextField).toBeDefined();

    expect(Global.YearPickerField).toBeDefined();
  });

  it('Organisms', () => {
    expect(Global.ActionBar).toBeDefined();

    expect(Global.ColumnType).toBeDefined();
    expect(Global.SortDirectionEnum).toBeDefined();

    expect(Global.EditableDataTable).toBeDefined();

    expect(Global.LineEditableDataTable).toBeDefined();

    expect(Global.LineEditableInPlaceDataTable).toBeDefined();

    expect(Global.StaticDataTable).toBeDefined();

    expect(Global.FieldTypeEnum).toBeDefined();
    expect(Global.Form).toBeDefined();
    expect(Global.Highlighter).toBeDefined();
    expect(Global.useForm).toBeDefined();

    expect(Global.FilterTypeEnum).toBeDefined();
    expect(Global.Filter).toBeDefined();
    expect(Global.FilterItem).toBeDefined();

    expect(Global.NavBar).toBeDefined();
    expect(Global.NavItem).toBeDefined();

    expect(Global.SideBarSection).toBeDefined();
    expect(Global.SideBarItem).toBeDefined();
    expect(Global.SideBar).toBeDefined();
  });

  it('hooks', () => {
    expect(Global.useEventListener).toBeDefined();
    expect(Global.useIsomorphicLayoutEffect).toBeDefined();
    expect(Global.useOnClickOutside).toBeDefined();
    expect(Global.useOnEscapePressed).toBeDefined();
    expect(Global.useRunAfterUpdate).toBeDefined();
  });
});
