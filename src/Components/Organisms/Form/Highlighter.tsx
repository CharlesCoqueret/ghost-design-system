// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

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
                  highlighted: shouldHighlight,
                  input: oldData,
                  readOnly: true,
                })}
            </Col>
          </Row>
        );
      })}
    </>
  );
};

export default memo(Highlighter);
