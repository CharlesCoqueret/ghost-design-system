import { StylesConfig } from 'react-select';

import { IOption } from './types';

interface ICustomStylesProps {
  isInError?: boolean;
}

export const customStyles = (props: ICustomStylesProps = {}): StylesConfig<IOption> => {
  const { isInError = false } = props;

  return {
    control: (provided, state) => {
      let border = `1px solid rgb(var(--theme-provider-chalk))`;
      let hover = { border: '1px solid rgb(var(--theme-provider-scooter))' };

      if (state.isFocused) {
        border = '1px solid rgb(var(--theme-provider-scooter))';
      }

      if (isInError) {
        border = '1px solid rgb(var(--theme-provider-error))';
        hover = { border: '1px solid rgb(var(--theme-provider-error))' };
      }

      return {
        ...provided,
        outline: 0,
        boxShadow: 'none',
        minHeight: 'unset',
        border,
        ':hover': hover,
      };
    },
    input: (provided, state) => {
      let multi = {};

      if (state.isMulti && state.hasValue) {
        multi = {
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        };
      }
      return { ...provided, ...multi };
    },
    option: (provided, state) => {
      let backgroundColor = provided.backgroundColor;
      let active = provided[':active'];
      const color = 'rgb(var(--theme-provider-black))';
      const cursor = 'pointer';

      if (state.isFocused && state.isSelected) {
        backgroundColor = 'rgba(var(--theme-provider-scooter), 0.5)';
        active = {
          ...active,
          backgroundColor: 'rgba(var(--theme-provider-scooter), 0.5)',
        };
      } else if (state.isFocused) {
        backgroundColor = 'rgba(var(--theme-provider-chalk), 0.33)';
        active = { ...active, backgroundColor: 'rgba(var(--theme-provider-chalk), 0.66)' };
      } else if (state.isSelected) {
        backgroundColor = 'rgba(var(--theme-provider-scooter), 0.33)';
        active = {
          ...active,
          backgroundColor: 'rgba(var(--theme-provider-scooter), 0.66)',
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
      return { ...provided, flexWrap: 'nowrap', whiteSpace: 'nowrap', textOverflow: 'ellipsis', padding: '0px 8px' };
    },
    container: (provided) => {
      return { ...provided, maxWidth: '100%', width: '100%' };
    },
    menu: (provided) => {
      return { ...provided, boxShadow: '0px 2px 10px 0px rgba(var(--theme-provider-black), 0.25)' };
    },
  };
};
