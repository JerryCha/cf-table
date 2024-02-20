/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren } from "react";
import { DataItem, IColumn } from "../../Table";

export interface IRowFormRef {
  validate: () => Promise<DataItem>;
  resetFieldsValue: () => void;
  getFieldsValue: () => DataItem;
}

export type IRowFormProps = PropsWithChildren<{
  columns?: IColumn[];
  row: DataItem;
  [p: string]: any;
}>;

export type IRowFieldProps = PropsWithChildren<{
  column: IColumn;
  row: DataItem;
  [p: string]: any;
}>;
