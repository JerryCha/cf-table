/* eslint-disable @typescript-eslint/no-explicit-any */
import { IColumn } from "../types/column";
import type { TableColumnGroupType, TableColumnType } from "antd";
import { DataItem } from "../types/store";
import React, { CSSProperties } from "react";
import { ITableInstance } from "../types/instance";

interface CreateAntTableColumnOptions<I extends ITableInstance> {
  customRender?: (
    value: any,
    index: number,
    name: string,
    row: DataItem,
    table: I
  ) => React.ReactNode;
  onCell?: (
    value: any,
    index: number,
    name: string,
    row: DataItem,
    table: I
  ) => {
    rowSpan?: number;
    colSpan?: number;
    className?: string;
    style?: CSSProperties;
  };
}

export function createAntTableColumn<I extends ITableInstance>(
  columnDef: IColumn,
  options: CreateAntTableColumnOptions<I>,
  table: I
): TableColumnType<DataItem> | TableColumnGroupType<DataItem> {
  const { name, title, width, fixed, isGroup, columns } = columnDef;

  if (isGroup) {
    const children = columns
      ?.filter((col) => col.visible === undefined || col.visible === true)
      .map((column) => createAntTableColumn(column, options, table));
    return {
      key: `group-${title}`,
      title,
      children: children ?? [],
    };
  }

  const { customRender, onCell } = options;

  return {
    key: name,
    dataIndex: name,
    title,
    fixed,
    width,
    ellipsis: true,
    render: (value, record, index) => {
      return customRender?.(value, index, name, record, table) ?? value;
    },
    onCell: (record, index) => {
      const value = record[name];
      return onCell?.(value, index!, name, record, table) ?? {};
    },
  };
}
