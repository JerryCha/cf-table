/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";
import { DataItem, IColumn, ITablePlugin } from "../../Table";
import { IEditableTableInstance } from "./instance";
import { IRowFieldProps, IRowFormProps, IRowFormRef } from "./row";

export interface IEditableTablePlugin<T extends IEditableTableInstance>
  extends Pick<ITablePlugin<T>, "extendsTableInstance" | "body"> {
  toolbar?: (table: IEditableTableInstance) => React.ReactNode;
  cell?: {
    render?: (
      value: any,
      index: number,
      row: DataItem,
      column: IColumn,
      editing: boolean,
      table: T
    ) => React.ReactNode;
    onCell?: () => unknown;
  };
  row?: {
    render?: (
      index: number,
      row: DataItem,
      children: React.ReactNode,
      editing: boolean
    ) => React.ReactNode;
    onRow?: () => unknown;
  };
  form?: {
    Form?: ForwardRefExoticComponent<
      PropsWithoutRef<IRowFormProps> & RefAttributes<IRowFormRef>
    >;
    Field?: React.ComponentType<IRowFieldProps>;
  };
}
