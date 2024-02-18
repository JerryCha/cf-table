import Table, { TableProps } from "../Table";

interface EditableTableProps extends TableProps {}

const EditableTable = (props: EditableTableProps) => {
  return <Table {...props} />;
};

export default EditableTable;
