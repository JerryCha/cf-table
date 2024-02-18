import "antd/dist/antd.less";

import Table from "../components/Table";

import sampleColumn1 from "./sample_column1.json";
import sampleListData1 from "./sample_listdata1.json";
import {
  Button,
  Divider,
  Form,
  InputNumber,
  Radio,
  Space,
  Switch,
  Typography,
} from "antd";
import { useState } from "react";

const mockDataFetcher = () =>
  Promise.resolve({
    total: sampleListData1.length,
    list: sampleListData1.slice(0, 10),
  });

export const TestStory = () => {
  const [tableConfig, setTableConfig] = useState({
    showRowNumber: false,
    loadOnInit: true,
  });
  return (
    <div style={{ padding: 16 }}>
      <div>
        <Form
          initialValues={tableConfig}
          onValuesChange={(changed: Record<string, unknown>) => {
            setTableConfig((prevConfig) => ({ ...prevConfig, ...changed }));
          }}
          layout="inline"
        >
          <Form.Item
            name="showRowNumber"
            label="showRowNumber"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="loadOnInit"
            label="loadOnInit"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name={["pagination", "enabled"]}
            label="pagination.enabled"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name={["pagination", "defaultSize"]}
            label="pagination.defaultSize"
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name="rowSelection">
            <Radio.Group
              optionType="button"
              options={[
                { label: "OFF", value: undefined },
                { label: "SINGLE", value: "single" },
                { label: "MULTIPLE", value: "multiple" },
              ]}
            />
          </Form.Item>
        </Form>
      </div>
      <Divider />
      <div>
        <Table
          {...tableConfig}
          columns={sampleColumn1}
          dataLoader={mockDataFetcher}
          toolbar={(table) => (
            <Space>
              {[
                <Typography.Text key={1}>
                  index: {table.getIndex()}
                </Typography.Text>,
                <Typography.Text key={2}>
                  size: {table.getSize()}
                </Typography.Text>,
                <Button key={3} onClick={() => console.log(table.getIndex())}>
                  print inst
                </Button>,
                <Button key={4} onClick={() => table.setIndex(1)}>
                  SET INDEX 1
                </Button>,
                <Button
                  key={5}
                  onClick={() => {
                    console.log(table.getData());
                  }}
                >
                  PRINT DATA
                </Button>,
                <Button
                  key={6}
                  onClick={() => {
                    console.log(table.getSelections());
                  }}
                >
                  PRINT SELECTIONS
                </Button>,
              ]}
            </Space>
          )}
        />
      </div>
    </div>
  );
};
