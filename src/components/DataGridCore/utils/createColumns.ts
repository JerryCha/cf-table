import { ColumnHelper } from "@tanstack/react-table";
import { IColumn } from "../types/column";
import { DataItem } from "../types/store";

function createColumn(
  column: IColumn,
  columns: IColumn[],
  helper: ColumnHelper<DataItem>
) {
  if (column.isGroup && column.columns) {
    const subColumns = column.columns;
    return helper.group({
      header: column.title ?? "",
      id: column.title ?? "",
      columns: subColumns.map((subColumn) =>
        helper.accessor(subColumn.name, {
          header: subColumn.title,
        })
      ),
    });
  }
  return helper.accessor(column.name, {
    header: column.title,
  });
}

export default function createColumns(
  columns: IColumn[],
  helper: ColumnHelper<DataItem>
) {
  return columns.map((column) => {
    return createColumn(column, columns, helper);
  });
}
