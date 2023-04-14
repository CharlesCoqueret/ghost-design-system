import * as Global from '..';

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
    expect(Global.Separator).toBeDefined();

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

    expect(Global.ThemeProvider).toBeDefined();
    expect(Global.defaultTheme).toBeDefined();

    expect(Global.Tooltip).toBeDefined();
    expect(Global.MenuDirectionEnum).toBeDefined();

    expect(Global.Typography).toBeDefined();
    expect(Global.TextTypeEnum).toBeDefined();
  });

  it('Molecules', () => {
    expect(Global.Alert).toBeDefined();
    expect(Global.AlertType).toBeDefined();

    expect(Global.AmountField).toBeDefined();

    expect(Global.Banner).toBeDefined();
    expect(Global.BannerType).toBeDefined();

    expect(Global.Button).toBeDefined();
    expect(Global.ButtonColorEnum).toBeDefined();
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

    expect(Global.toast).toBeDefined();
    expect(Global.toast.Toaster).toBeDefined();

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

    expect(Global.Form).toBeDefined();
    expect(Global.useForm).toBeDefined();
    expect(Global.Highlighter).toBeDefined();

    expect(Global.FieldLegacyTypeEnum).toBeDefined();
    expect(Global.FormLegacy).toBeDefined();
    expect(Global.HighlighterLegacy).toBeDefined();
    expect(Global.useFormLegacy).toBeDefined();

    expect(Global.FilterTypeEnum).toBeDefined();
    expect(Global.Filter).toBeDefined();
    expect(Global.FilterItem).toBeDefined();

    expect(Global.NavBar).toBeDefined();
    expect(Global.NavBarMenu).toBeDefined();
    expect(Global.NavBarUtilities).toBeDefined();
    expect(Global.NavItem).toBeDefined();

    expect(Global.SideBarSection).toBeDefined();
    expect(Global.SideBarItem).toBeDefined();
    expect(Global.SideBar).toBeDefined();
  });

  it('Templates', () => {
    expect(Global.Portfolio).toBeDefined();
    expect(Global.PortfolioWrapped).toBeDefined();
  });

  it('hooks', () => {
    expect(Global.useEventListener).toBeDefined();
    expect(Global.useIsomorphicLayoutEffect).toBeDefined();
    expect(Global.useOnClickOutside).toBeDefined();
    expect(Global.useOnEscapePressed).toBeDefined();
    expect(Global.useRunAfterUpdate).toBeDefined();
  });
});
