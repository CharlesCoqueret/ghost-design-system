import React, { memo, PropsWithChildren, ReactElement } from 'react';

import { Col, Row } from '../../Atoms/Layout';

export interface IHighlighterProps {
  enableOldData?: boolean;
  enableSideBySide?: boolean;
  shouldHighlight?: boolean;
  oldData?: unknown;
}

const Highlighter = (props: PropsWithChildren<IHighlighterProps>): ReactElement => {
  const { children, enableOldData, enableSideBySide, oldData, shouldHighlight } = props;

  if (!enableSideBySide) return <>{children}</>;

  return (
    <>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return (
          <Row>
            <Col>{child}</Col>
            <Col>
              {enableOldData &&
                React.cloneElement(child, {
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
            </Col>
          </Row>
        );
      })}
    </>
  );
};

export default memo(Highlighter);
