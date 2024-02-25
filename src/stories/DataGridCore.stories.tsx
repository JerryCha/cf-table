import "antd/dist/antd.less";
import sampleColumn1 from "./sample_column1.json";
import sampleListData1 from "./sample_listdata1.json";
import type { StoryDefault, Story } from "@ladle/react";

import DataGridCore, { DataGridCoreProps } from "components/DataGridCore";
import { Space, Typography } from "antd";
import { flexRender } from "@tanstack/react-table";

export default {
  title: "Data Grid Core",
} satisfies StoryDefault;

export const SimpleDataGridStory: Story = () => {
  return (
    <DataGridCore
      columns={sampleColumn1}
      data={{ list: sampleListData1, total: sampleListData1.length }}
    >
      {(table) => (
        <>
          {table.getRowModel().rows.map((row) => {
            return (
              <div>
                <Space>
                  {row.getVisibleCells().map((cell) => (
                    <Typography.Text>{cell.getValue() as any}</Typography.Text>
                  ))}
                </Space>
              </div>
            );
          })}
        </>
      )}
    </DataGridCore>
  );
};

export const TableStory = () => {
  return (
    <DataGridCore
      columns={sampleColumn1}
      data={{ list: sampleListData1, total: sampleListData1.length }}
    >
      {(table) => (
        <div className="ant-table-wrapper">
          <table
            className="ant-table-content"
            style={{ minWidth: "100%",  }}
          >
            <thead className="ant-table-thead">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="ant-table-cell ant-table-cell-ellipsis"
                      colSpan={header.colSpan}
                      style={{ position: "relative", width: header.getSize() }}
                      // rowSpan={header.rowSpan}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getCanResize() ? (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          style={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            height: "100%",
                            width: 4,
                            background: "rgba(0, 0, 0, 0.5)",
                            cursor: "col-resize",
                            userSelect: "none",
                            touchAction: "none",
                          }}
                        ></div>
                      ) : null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="ant-table-tbody">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="ant-table-row ant-table-row-level-0"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="ant-table-cell ant-table-cell-ellipsis"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DataGridCore>
  );
};
