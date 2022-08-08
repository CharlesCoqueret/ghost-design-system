import type { LoadingIndicatorProps } from 'react-select';
import type { IOption } from '../types';
import React from 'react';
import { Icon } from '../../Icon';

type ILoadingIndicatorProps = LoadingIndicatorProps<IOption, false>;

type ILoadingIndicatorPropsExtented =
  | ILoadingIndicatorProps
  | (ILoadingIndicatorProps & {
      selectProps: {
        /** For test purpose only */
        'data-testid'?: string;
      };
    });

const LoadingIndicator = (props: ILoadingIndicatorPropsExtented) => {
  const { innerProps, selectProps } = props;
  const dataTestId = 'data-testid' in selectProps ? selectProps['data-testid'] : undefined;

  return (
    <div {...innerProps}>
      <Icon
        icon={['fal', 'spinner']}
        className='dynamic-search-spinner'
        data-testid={dataTestId ? `${dataTestId}-spinner` : undefined}
      />
    </div>
  );
};

LoadingIndicator.defaultProps = {};

export default LoadingIndicator;
