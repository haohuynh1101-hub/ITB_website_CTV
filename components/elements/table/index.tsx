import classNames from 'classnames';
import ReactTable from 'rc-table';

export interface IColumn {
  key?: string;
  className?: string;
  colSpan?: number;
  title?: string;
  dataIndex?: string;
  width?: string | number;
  fixed?: string | boolean;
  align?: string;
  render?: (value, row, index) => void;
}
type IProps = {
  columns: Object[];
  className?: string;
  id?: string;
  scroll?: Object;
  data: Object[];
  emptyText?: React.ReactNode;
};
export const Table: React.FC<IProps> = ({
  columns,
  className,
  id,
  scroll = { x: false, y: false },
  data,
  emptyText,
}) => {
  return (
    <>
      <ReactTable
        columns={columns}
        className={className}
        id={id}
        data={data}
        emptyText={emptyText}
      />
    </>
  );
};
