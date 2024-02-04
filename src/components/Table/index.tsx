import React from "react";
import { Table as AntTable, Pagination } from "antd";
import { IColumn } from "./types/column";
interface TableProps {
  columns?: IColumn[];
  pagination?: {
    enabled: boolean;
    options?: number[];
    defaultSize?: number;
    defaultPage?: number;
  };
  showRowNumber?: boolean;
  dataLoader?: unknown;
  toolbar?: () => React.ReactNode;
  plugins?: unknown;
}

const Table = (props: TableProps) => {
  const { toolbar } = props;

  return (
    <div className="cf-table-root">
      {toolbar ? <div className="cf-table-toolbar">{toolbar()}</div> : null}
      <div className="cf-table-body">
        <AntTable />
      </div>
      <div className="cf-table-pagination">
        <Pagination />
      </div>
    </div>
  );
};

export default Table;
