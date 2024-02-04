/* eslint-disable @typescript-eslint/no-explicit-any */
export type DataItem = Record<string, any>;

export type DataList = Array<DataItem>;

export interface ITableData {
  total: number;
  list: DataList;
}

export interface IPagination {
  index: PageIndexType;
  size: PageSizeType;
}

export type PageIndexType = number | null;

export type PageSizeType = number | null;

export interface IRowSelection {
  [key: string]: any;
}

export interface ITableStoreInitialState {
  pagination: {
    enabled: boolean;
    defaultSize?: number;
    defaultIndex?: number;
  };
}
