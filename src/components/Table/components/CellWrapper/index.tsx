import { DataItem } from "../../types/store";
import { HTMLAttributes } from "react";

interface CellWrapperProps extends HTMLAttributes<HTMLTableCellElement> {
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  row: DataItem;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, index: number, row: DataItem) => React.ReactNode;
}

export const CellWrapper = (
  props: React.PropsWithChildren<CellWrapperProps>
) => {
  const { index, value, row, render, children, ...restTdProps } = props;

  return <td {...restTdProps}>{render?.(value, index, row) ?? children}</td>;
};
