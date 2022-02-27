import alpha from 'color-alpha';
import { StylesConfig } from 'react-select';

import { IOption } from '../../Molecules/SelectField/types';

interface ICustomStylesProps {
  controlErrorColor?: string;
  controlFocusColor?: string;
  fontColor?: string;
  optionSelectedColor?: string;
  optionFocusColor?: string;
  isInError?: boolean;
}

export const customStyles = (props: ICustomStylesProps = {}): StylesConfig<IOption> => {
  const {
    controlErrorColor = 'rgb(255,52,24);',
    controlFocusColor = 'rgb(1,82,129)',
    fontColor = 'rgb(0,0,0)',
    optionFocusColor = 'rgb(228,228,228)',
    optionSelectedColor = 'rgb(38,186,212)',
    isInError = false,
  } = props;

  return {
    control: (provided, state) => {
      let border = provided.border;
      let hover = { border: `1px solid ${controlFocusColor}` };

      if (state.isFocused) {
        border = `1px solid ${controlFocusColor}`;
      }

      if (isInError) {
        border = `1px solid ${controlErrorColor}`;
        hover = { border: `1px solid ${controlErrorColor}` };
      }

      return {
        ...provided,
        outline: 0,
        boxShadow: 'none',
        border,
        ':hover': hover,
      };
    },
    multiValue: (provided) => {
      return { ...provided, minWidth: 'unset', maxWidth: '100%' };
    },
    multiValueLabel: (provided) => {
      return { ...provided, textOverflow: 'unset', fontSize: 'unsert' };
    },
    input: (provided, state) => {
      if (state.isMulti && state.hasValue) {
        return { provided, order: 5, width: 'fit-content' };
      }
      return provided;
    },
    option: (provided, state) => {
      let backgroundColor = provided.backgroundColor;
      let active = provided[':active'];
      const color = fontColor;
      const cursor = 'pointer';

      if (state.isFocused) {
        backgroundColor = alpha(optionFocusColor, 0.33);
        active = { ...active, backgroundColor: alpha(optionFocusColor, 0.66) };
      }

      if (state.isSelected) {
        backgroundColor = alpha(optionSelectedColor, 0.33);
        active = {
          ...active,
          backgroundColor: alpha(optionSelectedColor, 0.66),
        };
      }

      if (state.isFocused && state.isSelected) {
        backgroundColor = alpha(optionSelectedColor, 0.5);
        active = {
          ...active,
          backgroundColor: alpha(optionSelectedColor, 0.5),
        };
      }

      return {
        ...provided,
        ':active': active,
        backgroundColor,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        maxWidth: '100%',
        width: '100%',
        overflow: 'hidden',
        cursor,
        color,
      };
    },
    valueContainer: (provided) => {
      return { ...provided, flexWrap: 'nowrap' };
    },
    container: (provided) => {
      return { ...provided, maxWidth: '100%', width: '100%' };
    },
  };
};
