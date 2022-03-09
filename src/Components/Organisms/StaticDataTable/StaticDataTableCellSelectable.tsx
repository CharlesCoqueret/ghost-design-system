import React, { MouseEvent, ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

interface IStaticDataTableCellSelectableProps {
  handleSelectClick?: (event: MouseEvent<HTMLElement>, selected: boolean) => void;
  selected: boolean;
  selectable: boolean;
  dataTestId?: string;
}

interface IStaticDataTableCellSelectableState {
  selected: boolean;
}

/**
 * StaticDataTableCellSelectable creates a table cell containing a checkbox.
 * Note: It has been build as a class component to be able to bind the onClick action to this component only, avoiding other component to catch this click.
 */
class StaticDataTableCellSelectable extends React.Component<
  IStaticDataTableCellSelectableProps,
  IStaticDataTableCellSelectableState
> {
  constructor(props: IStaticDataTableCellSelectableProps) {
    super(props);
    this.state = { selected: this.props.selected };

    this.onClick = this.onClick.bind(this);
  }

  onClick(event: MouseEvent<HTMLTableCellElement>): void {
    event.stopPropagation();

    const selected = !this.props.selected;
    this.setState({ ...this.state, selected: selected });
    if (this.props.handleSelectClick) {
      this.props.handleSelectClick(event, selected);
    } else {
      throw new Error('Missing handleSelectClick');
    }
  }

  render(): ReactElement {
    return (
      <td
        key='cell-selectable'
        className={this.props.selectable ? 'table--value--selectable' : 'table--value--selectable-disabled'}
        onClick={this.props.selectable ? this.onClick : undefined}>
        <div className={classnames('checkbox-marker', { selected: this.props.selected })}>
          <FontAwesomeIcon
            icon={[
              this.props.selected || !this.props.selectable ? 'fas' : 'fal',
              this.props.selected ? 'square-check' : 'square',
            ]}
            size='lg'
            data-testid={this.props.dataTestId}
          />
        </div>
      </td>
    );
  }
}

export default StaticDataTableCellSelectable;
