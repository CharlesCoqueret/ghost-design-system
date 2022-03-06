import React, { ReactElement } from 'react';

import StaticDataTableFooterCell from './StaticDataTableFooterCell';
import { IColumnType, IExtraStaticDataTableProps } from './types';

interface IStaticDataTableFooterProps<T> {
  columns: Array<IColumnType<T>>;
  data: Array<T>;
  extra?: IExtraStaticDataTableProps<T>;
}

const StaticDataTableFooter = <T,>(props: IStaticDataTableFooterProps<T>): ReactElement => {
  const { columns, data, extra } = props;

  const isSelectable = extra?.onRowSelect;

  if (!extra?.computeTotal) {
    return <></>;
  }

  return (
    <tfoot>
      <tr>
        {isSelectable && <td key='footer-selectable' className='table--footer--selectable'></td>}
        {columns.map((column) => {
          return <StaticDataTableFooterCell column={column} data={data} extra={extra} key={`footer-${column.title}`} />;
        })}
      </tr>
    </tfoot>
  );
};

export default StaticDataTableFooter;
