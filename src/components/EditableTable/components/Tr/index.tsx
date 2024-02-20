import { DataItem, IColumn } from "../../../Table";
import { TrContext } from "../../contexts/TrContext";
import { useAtom } from "jotai";
import React, {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useEditingAtom } from "../../hooks/useEditingAtom";
import { RowState } from "../../types/store";
import { IRowFormProps, IRowFormRef } from "../../types/row";
import { DefaultRowForm } from "../RowForm";

interface TrProps {
  Form?: ForwardRefExoticComponent<
    PropsWithoutRef<IRowFormProps> & RefAttributes<IRowFormRef>
  >;
  index: number;
  row: DataItem;
  columns?: IColumn[];
  render?: (
    index: number,
    row: DataItem,
    children: React.ReactNode,
    editing: boolean
  ) => React.ReactNode;
}

const Tr = (props: React.PropsWithChildren<TrProps>) => {
  const {
    children,
    index,
    row,
    render = () => children,
    Form = DefaultRowForm,
    columns,
  } = props;
  const { editingAtom } = useEditingAtom();
  const [editingStore, setEditingStore] = useAtom(editingAtom);
  const rowState = editingStore[index];

  const rowIsEditing = rowState?.state === RowState.Editing ?? false;

  const contextValue = useMemo(() => {
    return { editing: rowIsEditing };
  }, [rowIsEditing]);

  const formRef = useRef<IRowFormRef | null>(null);

  useEffect(() => {
    const form = formRef.current;

    setEditingStore((prev) => {
      const next = { ...prev };
      const rowState = next[index];
      next[index] = {
        state: rowState?.state ?? RowState.Readonly,
        form: {
          getFieldsValue:
            form?.getFieldsValue ?? (() => new Error("not implmented")),
          resetFieldsValue:
            form?.resetFieldsValue ?? (() => new Error("not implemented")),
          validate: form?.validate ?? (() => Promise.reject("not implemented")),
        },
      };
      return next;
    });
  }, [index, setEditingStore, editingStore, formRef]);

  // TODO: 这里还需要根据editing包裹Form？
  return (
    <TrContext.Provider value={contextValue}>
      <Form row={row} ref={formRef} columns={columns}>
        {render(index, row, children, rowIsEditing)}
      </Form>
    </TrContext.Provider>
  );
};

export default Tr;
