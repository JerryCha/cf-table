import { useAtomValue } from "jotai";
import { DataItem } from "../../../Table";
import { editingAtom } from "../../store";
import { Form } from "antd";
import { IEditableTableInstance } from "../../types/instance";

interface TdProps<T extends IEditableTableInstance> {
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  row: DataItem;
  render?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    index: number,
    name: string,
    row: DataItem,
    editing: boolean,
    table: T
  ) => React.ReactNode;
  name: string;
  table: T;
}

function Td<T extends IEditableTableInstance>(
  props: React.PropsWithChildren<TdProps<T>>
) {
  const {
    children,
    value,
    row,
    index,
    name,
    render = () => children,
    table,
  } = props;
  const editingStore = useAtomValue(editingAtom);
  const editing = editingStore[index];

  return (
    <Form.Item noStyle name={name}>
      {render?.(value, index, name, row, editing, table) ?? value}
    </Form.Item>
  );
}

export default Td;
