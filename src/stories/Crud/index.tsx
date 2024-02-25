/* eslint-disable @typescript-eslint/no-explicit-any */
import EditableTable from "components/EditableTable";

interface CrudProps {
  data?: Record<string, any>;
  env?: any;
  
}

const Crud = (props: CrudProps) => {
  return <EditableTable />;
};

export default Crud;
