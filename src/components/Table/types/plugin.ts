/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { DataItem, DataList } from "./store";
import { ITableInstance } from "../types/instance";
import { useDefaultStore } from "../hooks/useDefaultStore";
import { IColumn } from "./column";

export interface ITablePlugin<T extends ITableInstance> {
  /**
   *
   * @param table 表格实例
   * @returns ReactNode
   */
  toolbar?: (table: T) => React.ReactNode;
  /**
   * 单元格定制
   */
  cell?: {
    render?: (
      value: any,
      index: number,
      row: DataItem,
      column: IColumn,
      table: T
    ) => React.ReactNode;
    onCell?: () => Record<string, any>;
  };
  /**
   * 行定制
   */
  row?: {
    render?: (
      index: number,
      row: DataItem,
      children: React.ReactNode
    ) => React.ReactNode;
    onRow?: () => Record<string, any>;
  };
  /**
   * 表格本体定制
   */
  body?: {
    render?: (list: DataList) => React.ReactNode;
  };
  extendsTableInstance?: (
    table: ReturnType<typeof useDefaultStore>
  ) => Record<string, any>;
}
