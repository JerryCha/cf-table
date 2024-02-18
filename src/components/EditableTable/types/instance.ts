import { ITableInstance } from "../../Table";

export interface IEditableTableInstance extends ITableInstance {
  /**
   * 编辑指定行
   * @param index 行号索引
   * @returns
   */
  beginEdit: (index: number) => void;
  /**
   * 结束编辑指定行并提交数据
   * @param index 行号索引
   * @returns
   */
  endEdit: (index: number) => void;
  /**
   * 取消编辑指定行
   * @param index 行号索引
   * @returns
   */
  cancelEdit: (index: number) => void;
}
