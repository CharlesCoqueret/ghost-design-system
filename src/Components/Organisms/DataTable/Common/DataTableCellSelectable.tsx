import React, { KeyboardEvent, MouseEvent } from 'react';
import classnames from 'classnames';

import { Icon } from '../../../Atoms/Icon';

interface IDataTableCellSelectableProps {
  handleSelectClick?: (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>, selected: boolean) => void;
  selected?: boolean;
  selectable: boolean;
  dataTestId?: string;
}

interface IDataTableCellSelectableState {
  selected: boolean;
}

/**
 * DataTableCellSelectable creates a table cell containing a checkbox.
 * Note: It has been build as a class component to be able to bind the onClick action to this component only, avoiding other component to catch this click.
 */
class DataTableCellSelectable extends React.Component<IDataTableCellSelectableProps, IDataTableCellSelectableState> {
  constructor(props: IDataTableCellSelectableProps) {
    super(props);
    this.state = { selected: this.props.selected || false };

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>): void {
    if (event.type === 'keyup' && (event as KeyboardEvent).key !== 'Enter') {
      return;
    }

    event.stopPropagation();

    const selected = !this.props.selected;
    this.setState({ ...this.state, selected: selected });
    if (this.props.handleSelectClick) {
      this.props.handleSelectClick(event, selected);
    } else {
      console.error('Missing handleSelectClick');
    }
  }

  render() {
    return (
      <td
        key='cell-selectable'
        className={this.props.selectable ? 'table--value--selectable' : 'table--value--selectable-disabled'}
        // eslint-disable-next-line @typescript-eslint/unbound-method
        onClick={this.props.selectable ? this.onSelect : undefined}
        // eslint-disable-next-line @typescript-eslint/unbound-method
        onKeyUp={this.props.selectable ? this.onSelect : undefined}
        tabIndex={this.props.selectable ? 0 : -1}>
        <div className={classnames('checkbox-marker', { selected: this.props.selected })}>
          <Icon
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

export default DataTableCellSelectable;
