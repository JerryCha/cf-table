import { useMemo } from "react";
import { IColumn } from "../types/column";
import { createColumnHelper } from "@tanstack/react-table";
import { DataItem } from "../types/store";
import createColumns from "../utils/createColumns";

export default function useColumns(columns: IColumn[]) {
  const columnHelper = useMemo(() => createColumnHelper<DataItem>(), []);

  const renderColumns = useMemo(() => {
    return createColumns(columns, columnHelper);
  }, [columns, columnHelper]);

  return renderColumns;
}
