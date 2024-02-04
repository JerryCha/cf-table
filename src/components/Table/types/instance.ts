import {
  DataItem,
  DataList,
  ITableData,
  PageIndexType,
  PageSizeType,
} from "./store";

export interface ITableInstance {
  /**
   * 获取列表当前数据(列表)
   * @returns 列表数据
   */
  getData: () => DataList;
  /**
   * 设置列表数据 (列表 + 总数)
   * @param data 数据
   * @returns
   */
  setData: (data: ITableData) => void;
  /**
   * 获取指定行数据
   * @param index 行号 (从1开始)
   * @returns
   */
  getRow: (index: number) => DataItem;
  /**
   * 获取数据总数
   * @returns 数据总数
   */
  getTotal: () => number;
  /**
   * 获取当前页码
   * @returns 当前页码
   */
  getIndex: () => PageIndexType;
  /**
   * 设置当前页码
   * @param index 新的当前页码
   * @returns
   */
  setIndex: (index: number) => void;
  /**
   * 获取当前分页尺寸
   * @returns 当前分页尺寸
   */
  getSize: () => PageSizeType;
  /**
   * 设置当前分页尺寸
   * @param size 新的分页尺寸
   * @returns
   */
  setSize: (size: number) => void;
  /**
   * 按当前参数刷新表格数据
   * @returns
   */
  refresh: () => void;
}
