import "antd/dist/antd.less";

import EditableTable from "../components/EditableTable";

import sampleColumn1 from "./sample_column1.json";
import sampleListData1 from "./sample_listdata1.json";
import { Button, Input, Space } from "antd";

const mockDataFetcher = () =>
  Promise.resolve({
    total: sampleListData1.length,
    list: sampleListData1.slice(0, 10),
  });

export const TestStory = () => {
  return (
    <div style={{ padding: 16 }}>
      <EditableTable
        columns={sampleColumn1}
        dataLoader={mockDataFetcher}
        loadOnInit
        toolbar={(table) => (
          <Space>
            <Button
              onClick={() => {
                console.log(table);
                table.beginEdit(0);
              }}
            >
              EDIT ROW 0
            </Button>
          </Space>
        )}
        plugin={{
          cell: {
            render: (value, index, name, row, editing) => {
              console.log(value, editing);
              return editing ? <Input /> : value;
            },
          },
        }}
      />
    </div>
  );
};
