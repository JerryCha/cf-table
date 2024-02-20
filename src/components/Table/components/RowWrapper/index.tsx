import { DataItem } from "../../types/store";
import React, { HTMLAttributes } from "react";

interface RowWrapperProps extends HTMLAttributes<HTMLTableRowElement> {
  index: number;
  row: DataItem;
  render?: (
    index: number,
    row: DataItem,
    children: React.ReactNode
  ) => React.ReactNode;
}

export const RowWrapper = (props: React.PropsWithChildren<RowWrapperProps>) => {
  const { index, row, render, children, ...rest } = props;

  return <tr {...rest}>{render?.(index, row, children) ?? children}</tr>;
};
