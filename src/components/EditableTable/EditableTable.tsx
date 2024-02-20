import { useAtom } from "jotai";
import Table, { DataItem, TableProps } from "../Table";
import { IEditableTableInstance } from "./types/instance";
import { createEditingAtom } from "./store";
import Tr from "./components/Tr";
import { IEditableTablePlugin } from "./types/plugin";
import Td from "./components/Td";
import { useMemo } from "react";
import { EditingAtomContext } from "./contexts/EditingAtomContext";
import { RowState } from "./types/store";

interface EditableTableProps<I extends IEditableTableInstance>
  extends Omit<TableProps<I>, "plugin" | "toolbar"> {
  plugin?: IEditableTablePlugin<I>;
  toolbar?: (table: IEditableTableInstance) => React.ReactNode;
}

function EditableTable<
  I extends IEditableTableInstance = IEditableTableInstance
>(props: EditableTableProps<I>) {
  const { plugin, ...rest } = props;

  const editingAtom = useMemo(() => {
    return createEditingAtom();
  }, []);
  const [editingStore, setEditingStore] = useAtom(editingAtom);

  return (
    <EditingAtomContext.Provider value={{ editingAtom }}>
      <Table<I>
        {...rest}
        plugin={{
          toolbar: plugin?.toolbar,
          body: plugin?.body,
          row: {
            render: (index, row, children) => {
              const rowRender = plugin?.row?.render;
              return (
                <Tr
                  index={index}
                  row={row}
                  render={rowRender}
                  columns={rest.columns}
                  Form={plugin?.form?.Form}
                >
                  {children}
                </Tr>
              );
            },
          },
          cell: {
            render: (value, index, row, column, table) => {
              const cellRender = plugin?.cell?.render;
              return (
                <Td<I>
                  index={index}
                  value={value}
                  row={row}
                  render={cellRender}
                  table={table}
                  column={column}
                  Field={plugin?.form?.Field}
                />
              );
            },
          },
          extendsTableInstance: (store) =>
            ({
              beginEdit(index) {
                setEditingStore((prev) => {
                  const next = { ...prev };
                  let rowState = next[index];
                  if (!rowState) {
                    rowState = {
                      state: RowState.Readonly,
                      form: null,
                    };
                    next[index] = rowState;
                  }
                  rowState.state = RowState.Editing;
                  return next;
                });
              },
              endEdit(index) {
                const { setData } = store;
                const rowForm = editingStore[index].form;
                rowForm?.validate().then((values: DataItem) => {
                  setEditingStore((prev) => {
                    const next = { ...prev };
                    const rowState = next[index];
                    rowState.state = RowState.Readonly;
                    return next;
                  });
                  setData((prevData) => {
                    const nextData = { ...prevData };
                    const nextList = [...nextData.list];
                    // TODO: 如何将数据更新回store
                    nextList[index] = values;
                    nextData.list = nextList;
                    return nextData;
                  });
                });
              },
              cancelEdit(index) {
                setEditingStore((prev) => {
                  const next = { ...prev };
                  next[index].state = RowState.Readonly;
                  return next;
                });
                editingStore[index].form?.resetFieldsValue();
              },
            } as IEditableTableInstance),
        }}
      />
    </EditingAtomContext.Provider>
  );
}

export default EditableTable;
