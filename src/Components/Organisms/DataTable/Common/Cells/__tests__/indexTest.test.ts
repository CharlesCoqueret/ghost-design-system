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
