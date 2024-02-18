import { TableInstanceProvderContext } from "../../contexts/provider";
import { ITableInstance } from "../../types/instance";

export const TableInstanceProvier = (
  props: React.PropsWithChildren<{ tableInstance: ITableInstance }>
) => (
  <TableInstanceProvderContext.Provider value={props.tableInstance}>
    {props.children}
  </TableInstanceProvderContext.Provider>
);
