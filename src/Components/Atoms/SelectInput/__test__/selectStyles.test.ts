import { GroupBase, OptionProps } from 'react-select';
import { customStyles } from '../selectStyles';

describe('customStyles method', () => {
  it('customStyles provides object', async () => {
    const styles = customStyles();

    expect(styles.control).toBeDefined();
    expect(styles.input).toBeDefined();
    expect(styles.option).toBeDefined();
    expect(styles.valueContainer).toBeDefined();
    expect(styles.container).toBeDefined();
  });

  it('customStyles option', async () => {
    const styles = customStyles();

    expect(styles.option).not.toBeUndefined();

    if (styles.option) {
      expect(
        styles.option({ height: '5px' }, { isFocused: true, isSelected: true } as OptionProps<
          { value: string | number; label: string },
          true,
          GroupBase<{ value: string | number; label: string }>
        >),
      )?.toMatchSnapshot();
      expect(
        styles.option({ height: '5px' }, { isSelected: true } as OptionProps<
          { value: string | number; label: string },
          true,
          GroupBase<{ value: string | number; label: string }>
        >),
      )?.toMatchSnapshot();
    }
  });
});
