import { IColumn } from "components/Table";

export interface ColumnConfig extends IColumn {
  formater?: unknown;
  hoverTip?: {
    show: boolean;
    formater: unknown;
  };
  fieldProps?: unknown;
}
