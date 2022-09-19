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
                  disabled: undefined,
                  errorMessage: undefined,
                  extra: {
                    ...child.props?.extra,
                    // For table use case
                    onEdit: undefined,
                    onRowEdit: undefined,
                    onRowSubmit: undefined,
                    onRowDelete: undefined,
                    isEditable: () => false,
                    isDeletable: () => false,
                    canAddNewLine: () => false,
                  },
                  helperText: undefined,
                  highlighted: shouldHighlight,
                  id: undefined,
                  inputValue: oldData, // For fields
                  data: oldData || [], // For table use case
                  maxLength: undefined,
                  name: undefined,
                  onChange: undefined,
                  placeholder: undefined,
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
