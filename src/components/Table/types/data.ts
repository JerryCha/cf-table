/* eslint-disable @typescript-eslint/no-explicit-any */
export type DataItem = Record<string, any>;

export interface ITableData {
  total: number;
  list: Array<DataItem>;
}
