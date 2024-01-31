import { Table as AntTable, Button, Pagination } from "antd";
import { IColumn } from "./types/column";
import React from "react";

interface TableProps {
  columns?: IColumn[];
  pagination?: {
    enabled: boolean;
    options?: number[];
    defaultSize?: number;
    defaultPage?: number;
  };
  toolbar?: () => React.ReactNode;
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
