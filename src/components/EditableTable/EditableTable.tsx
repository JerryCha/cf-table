import { useSetAtom } from "jotai";
import Table, { TableProps } from "../Table";
import { IEditableTableInstance } from "./types/instance";
import { createEditingAtom } from "./store";
import Tr from "./components/Tr";
import { IEditableTablePlugin } from "./types/plugin";
import Td from "./components/Td";
import { useMemo } from "react";
import { EditingAtomContext } from "./contexts/EditingAtomContext";

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
  const setEditing = useSetAtom(editingAtom);

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
                <Tr index={index} row={row} render={rowRender}>
                  {children}
                </Tr>
              );
            },
          },
          cell: {
            render: (value, index, name, row, table) => {
              const cellRender = plugin?.cell?.render;
              return (
                <Td<I>
                  index={index}
                  value={value}
                  row={row}
                  name={name}
                  render={cellRender}
                  table={table}
                />
              );
            },
          },
          extendsTableInstance: (store) =>
            ({
              beginEdit(index) {
                setEditing((prev) => ({ ...prev, [index]: true }));
              },
              endEdit(index) {
                const { setData } = store;
                setEditing((prev) => ({ ...prev, [index]: false }));
                setData((prevData) => {
                  const nextData = { ...prevData };
                  const nextList = [...nextData.list];
                  // TODO: 如何将数据更新回store
                  nextData.list = nextList;
                  return nextData;
                });
              },
              cancelEdit(index) {
                setEditing((prev) => ({ ...prev, [index]: false }));
              },
            } as IEditableTableInstance),
        }}
      />
    </EditingAtomContext.Provider>
  );
}

export default EditableTable;
