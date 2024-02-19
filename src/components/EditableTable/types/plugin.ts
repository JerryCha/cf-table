/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { DataItem, ITablePlugin } from "../../Table";
import { IEditableTableInstance } from "./instance";

export interface IEditableTablePlugin<T extends IEditableTableInstance>
  extends Pick<ITablePlugin<T>, "extendsTableInstance" | "body"> {
  toolbar?: (table: IEditableTableInstance) => React.ReactNode;
  cell?: {
    render?: (
      value: any,
      index: number,
      name: string,
      row: DataItem,
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
}
