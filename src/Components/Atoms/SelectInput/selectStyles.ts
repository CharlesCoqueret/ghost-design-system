import alpha from 'color-alpha';
import { StylesConfig } from 'react-select';

import { IOption } from './types';

interface ICustomStylesProps {
  controlErrorColor?: string;
  controlFocusColor?: string;
  controlBackgroundColorDisabled?: string;
  controlColorDisabled?: string;
  fontColor?: string;
  multiValueBorderColorDisabled?: string;
  optionSelectedColor?: string;
  optionFocusColor?: string;
  isInError?: boolean;
}

export const customStyles = (props: ICustomStylesProps = {}): StylesConfig<IOption> => {
  const {
    controlErrorColor = 'rgb(255,52,24);',
    controlFocusColor = 'rgb(1,82,129)',
    controlBackgroundColorDisabled = 'rgb(228,228,228)',
    controlColorDisabled = 'rgb(117,117,117)',
    fontColor = 'rgb(0,0,0)',
    multiValueBorderColorDisabled = 'rgb(196,196,196)',
    optionFocusColor = 'rgb(228,228,228)',
    optionSelectedColor = 'rgb(38,186,212)',
    isInError = false,
  } = props;

  return {
    control: (provided, state) => {
      let border = provided.border;
      let hover = { border: `1px solid ${controlFocusColor}` };
      let disabled = {};

      if (state.isFocused) {
        border = `1px solid ${controlFocusColor}`;
      }

      if (isInError) {
        border = `1px solid ${controlErrorColor}`;
        hover = { border: `1px solid ${controlErrorColor}` };
      }

      if (state.isDisabled) {
        disabled = { backgroundColor: controlBackgroundColorDisabled, border: 'none' };
      }

      return {
        ...provided,
        outline: 0,
        boxShadow: 'none',
        border,
        ...disabled,
        ':hover': hover,
        ':disabled': disabled,
      };
    },
    multiValue: (provided, state) => {
      let disabled = {};
      if (state.isDisabled) {
        disabled = { border: `1px solid ${multiValueBorderColorDisabled}` };
      }
      return { ...provided, ...disabled, minWidth: 'unset', maxWidth: '100%' };
    },
    multiValueLabel: (provided) => {
      return { ...provided, textOverflow: 'unset', fontSize: 'unsert' };
    },
    multiValueRemove: (provided, state) => {
      let disabled = {};
      if (state.isDisabled) {
        disabled = { display: 'none' };
      }
      return { ...provided, ...disabled };
    },
    input: (provided, state) => {
      let multi = {};
      let disabled = {};

      if (state.isMulti && state.hasValue) {
        multi = { order: 5, width: 'fit-content' };
      }
      if (state.isDisabled) {
        disabled = { color: controlColorDisabled };
      }
      return { ...provided, ...multi, disabled };
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
