import React, { ReactElement } from 'react';

import StaticDataTableFooterCell from './StaticDataTableFooterCell';
import { IColumnType, IExtraStaticDataTableProps } from '../Common/types';

interface IStaticDataTableFooterProps<T> {
  columns: Array<IColumnType<T>>;
  data: Array<T>;
  extra?: IExtraStaticDataTableProps<T>;
}

const StaticDataTableFooter = <T,>(props: IStaticDataTableFooterProps<T>): ReactElement => {
  const { columns, data, extra } = props;

  if (!extra?.computeTotal) {
    return <></>;
  }

  return (
    <tfoot>
      <tr>
        <td key='footer-selectable' className='table--footer--selectable'>
          {extra.localization?.total ?? 'Total'}
        </td>

        {columns.map((column) => {
          return (
            <StaticDataTableFooterCell
              column={column}
              data={data}
              extra={extra}
              key={`footer-${column.title}`}
              rowIndex={data.length + 1}
            />
          );
        })}
      </tr>
    </tfoot>
  );
};

export default StaticDataTableFooter;
