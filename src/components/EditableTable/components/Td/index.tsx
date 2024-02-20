import { DataItem, IColumn } from "../../../Table";
import { IEditableTableInstance } from "../../types/instance";
import { useRowContext } from "../../hooks/useRowContext";
import React from "react";
import { IRowFieldProps } from "../../types/row";
import { DefaultCellField } from "../RowForm";

interface TdProps<T extends IEditableTableInstance> {
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  row: DataItem;
  render?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    index: number,
    row: DataItem,
    column: IColumn,
    editing: boolean,
    table: T
  ) => React.ReactNode;
  Field?: React.ComponentType<IRowFieldProps>;
  column: IColumn;
  table: T;
}

function Td<T extends IEditableTableInstance>(
  props: React.PropsWithChildren<TdProps<T>>
) {
  const {
    children,
    value,
    row,
    index,
    render = () => children,
    table,
    column,
    Field = DefaultCellField,
  } = props;

  const { editing } = useRowContext();

  return editing ? (
    <Field column={column} row={row}>
      {render?.(value, index, row, column, editing, table) ?? value}
    </Field>
  ) : (
    render?.(value, index, row, column, editing, table) ?? value
  );
}

export default Td;
