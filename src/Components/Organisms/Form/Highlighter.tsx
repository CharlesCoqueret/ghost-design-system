import React, { PropsWithChildren, ReactElement } from 'react';

import { Col, Row } from '../../Atoms/Layout';

export interface IHighlighterProps {
  highlight?: boolean;
  shouldHighlight?: boolean;
  oldData?: unknown;
}

const Highlighter = (props: PropsWithChildren<IHighlighterProps>): ReactElement => {
  const { children, highlight, oldData, shouldHighlight } = props;

  if (!highlight || oldData === undefined) return <>{children}</>;

  return (
    <>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return (
          <Row>
            <Col>{child}</Col>
            <Col>
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
            </Col>
          </Row>
        );
      })}
    </>
  );
};

export default Highlighter;
