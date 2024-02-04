/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { DataItem, DataList } from "./store";

export interface ITablePlugin {
  /**
   *
   * @param table 表格实例
   * @returns ReactNode
   */
  toolbar?: (table: unknown) => React.ReactNode;
  /**
   * 单元格定制
   */
  cell?: {
    render?: (value: any, index: number, row: DataItem) => React.ReactNode;
    onCell?: () => unknown;
  };
  /**
   * 行定制
   */
  row?: {
    render?: (index: number, row: DataItem) => React.ReactNode;
    onRow?: (index: number, row: DataItem) => unknown;
  };
  /**
   * 表格本体定制
   */
  body?: {
    render?: (list: DataList) => React.ReactNode;
  };
  createStore?: () => unknown;
}
