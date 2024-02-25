import { useMemo, PropsWithChildren } from "react";
import { Provider, createStore } from "jotai";
import { IColumn } from "./types/column";
import {
  RowModel,
  Table as ReactTableRef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useColumns from "./hooks/useColumns";
import { DataItem, ITableData } from "./types/store";

export interface DataGridCoreProps {
  columns?: IColumn[];
  dataSource?: unknown;
  data?: ITableData;
  pagination?: {
    enabled: boolean;
    options?: number[];
    defaultSize?: number;
    defaultPage?: number;
  };
  rowSelection?: "single" | "multiple";
  loadingTip?: string;
  toolbar?: (table: unknown) => React.ReactNode;
  children: (table: ReactTableRef<DataItem>) => React.ReactNode;
}

const DataGridCore = (props: DataGridCoreProps) => {
  const { children, columns: columnDefs = [], data } = props;
  const store = useMemo(() => createStore(), []);

  const columns = useColumns(columnDefs);

  const table = useReactTable({
    columns,
    data: data?.list ?? [],
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
  });

  return <Provider store={store}>{children(table)}</Provider>;
};

export default DataGridCore;
