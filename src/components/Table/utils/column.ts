/* eslint-disable @typescript-eslint/no-explicit-any */
import { IColumn } from "../types/column";
import type { TableColumnType } from "antd";
import { DataItem } from "../types/store";
import React, { CSSProperties } from "react";

interface CreateAntTableColumnOptions {
  customRender?: (value: any, index: number, row: DataItem) => React.ReactNode;
  onCell?: (
    value: any,
    index: number,
    row: DataItem
  ) => {
    rowSpan?: number;
    colSpan?: number;
    className?: string;
    style?: CSSProperties;
  };
}

export const createAntTableColumn = (
  columnDef: IColumn,
  options: CreateAntTableColumnOptions
): TableColumnType<DataItem> => {
  const { name, title } = columnDef;

  const { customRender, onCell } = options;

  return {
    key: name,
    dataIndex: name,
    title,
    ellipsis: true,
    render: (value, record, index) => {
      return customRender?.(value, index, record) ?? value;
    },
    onCell: (record, index) => {
      const value = record[name];
      return onCell?.(value, index!, record) ?? {};
    },
  };
};
