import React, { MouseEvent, ReactElement } from 'react';

interface IStaticDataTableCellSelectableProps {
  handleSelectClick?: (event: MouseEvent<HTMLElement>, selected: boolean) => void;
  selected: boolean;
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
      throw new Error('Missing handleSelectClick in StaticDataTableCellSelectable');
    }
  }

  render(): ReactElement {
    return (
      <td key='cell-selectable' className='table--value--selectable' onClick={this.onClick}>
        <input type='checkbox' checked={this.props.selected} />
      </td>
    );
  }
}

export default StaticDataTableCellSelectable;
