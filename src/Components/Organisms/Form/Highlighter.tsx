import React, { PropsWithChildren, ReactElement } from 'react';

import { Row } from '../../Atoms/Layout';

export interface IHighlighterProps {
  highlight?: boolean;
  shouldHighlight?: boolean;
  oldData?: unknown;
}

const Highlighter = (props: PropsWithChildren<IHighlighterProps>): ReactElement => {
  const { children, highlight, oldData, shouldHighlight } = props;

  if (!highlight || oldData === undefined) return <Row>{children}</Row>;

  return (
    <>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return (
          <Row>
            {child}
            {React.cloneElement(child, {
              onChange: undefined,
              readOnly: true,
              inputValue: oldData,
              highlighted: shouldHighlight,
              errorMessage: undefined,
              placeholder: undefined,
              helperText: undefined,
              disabled: undefined,
              maxLength: undefined,
              id: undefined,
              name: undefined,
            })}
          </Row>
        );
      })}
    </>
  );
};

export default Highlighter;
