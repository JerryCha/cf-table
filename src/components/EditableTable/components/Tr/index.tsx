import { Form } from "antd";
import { DataItem } from "../../../Table";
import { TrContext } from "../../contexts/TrContext";
import { editingAtom } from "../../store";
import { useAtomValue } from "jotai";
import React, { useMemo } from "react";

interface TrProps {
  index: number;
  row: DataItem;
  render?: (
    index: number,
    row: DataItem,
    children: React.ReactNode,
    editing: boolean
  ) => React.ReactNode;
}

const Tr = (props: React.PropsWithChildren<TrProps>) => {
  const { children, index, row, render = () => children } = props;
  const editing = useAtomValue(editingAtom);
  const rowIsEditing = editing[index];

  const contextValue = useMemo(() => {
    return { editing: rowIsEditing };
  }, [rowIsEditing]);

  const [form] = Form.useForm();

  // TODO: 这里还需要根据editing包裹Form？
  return (
    <TrContext.Provider value={contextValue}>
      {rowIsEditing ? (
        <Form form={form} component={false} initialValues={row}>
          {render(index, row, children, rowIsEditing)}
        </Form>
      ) : (
        render(index, row, children, rowIsEditing)
      )}
    </TrContext.Provider>
  );
};

export default Tr;
