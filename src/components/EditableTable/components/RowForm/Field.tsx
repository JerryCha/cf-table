import { IRowFieldProps } from "../../types/row";
import { Form as AntForm } from "antd";

export const DefaultCellField = (props: IRowFieldProps) => {
  const { children, column, ...rest } = props;

  return (
    <AntForm.Item {...rest} noStyle name={column.name}>
      {children}
    </AntForm.Item>
  );
};
