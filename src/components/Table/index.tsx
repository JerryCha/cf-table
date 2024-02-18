import React, { useMemo } from "react";
import { Table as AntTable, Pagination, Typography } from "antd";
import { useRequest } from "ahooks";
import { IColumn } from "./types/column";
import styles from "./index.module.less";
import { createAntTableColumn } from "./utils/column";
import { DataItem, IPagination, ITableData } from "./types/store";
import { ITableInstance } from "./types/instance";
import { TableInstanceProvier } from "./components/TableInstanceProvider";
import { ColumnType } from "antd/lib/table";
import { ITablePlugin } from "./types/plugin";
import { useDefaultStore } from "./hooks/useDefaultStore";

interface TableProps {
  columns?: IColumn[];
  pagination?: {
    enabled: boolean;
    options?: number[];
    defaultSize?: number;
    defaultPage?: number;
  };
  rowSelection?: "single" | "multiple";
  expandable?: unknown;
  showRowNumber?: boolean;
  dataLoader?: (pagination: IPagination) => Promise<ITableData>;
  loadOnInit?: boolean;
  loadingTip?: string;
  toolbar?: (table: ITableInstance) => React.ReactNode;
  plugins?: ITablePlugin[];
}

const Table = (props: TableProps) => {
  const {
    toolbar,
    columns,
    showRowNumber,
    loadOnInit,
    dataLoader,
    pagination: paginationConf,
    rowSelection: rowSelectionConf,
    expandable,
    loadingTip,
  } = props;

  const store = useDefaultStore({
    data: { total: 0, list: [] },
    pagination: {
      index: paginationConf?.enabled ? 1 : null,
      size: paginationConf?.defaultSize ?? null,
    },
    rowSelection: [],
  });

  const {
    data,
    setData,
    pagination,
    setPagination,
    selections,
    setSelections,
  } = store;

  const { loading: listLoading, refresh } = useRequest(
    () => dataLoader?.(pagination) ?? Promise.resolve({ total: 0, list: [] }),
    {
      refreshDeps: [pagination],
      manual: !loadOnInit,
      onSuccess: (data) => {
        if (Array.isArray(data)) {
          const patchedData = data.map((item, idx) => ({
            ...item,
            $$idx: idx.toString(),
          }));
          setData({ total: patchedData.length, list: patchedData });
        } else {
          setData({
            ...data,
            list: data.list.map((item, idx) => ({
              ...item,
              $$idx: idx.toString(),
            })),
          });
        }
      },
    }
  );
  const primaryKey = useMemo(() => {
    let primary: string = "$$idx";
    const findPrimary = (col: IColumn) => {
      if (!primary && col.primaryKey) {
        primary = col.name;
      }
    };
    columns?.forEach((col) => {
      if (col.isGroup) {
        col.columns?.forEach((subCol) => {
          findPrimary(subCol);
        });
      }
      findPrimary(col);
    });
    return primary;
  }, [columns]);

  const tableInstance = useMemo<ITableInstance>(() => {
    return {
      getIndex() {
        return pagination.index;
      },
      setIndex(index) {
        setPagination({ ...pagination, index });
      },
      getSize() {
        return pagination.size;
      },
      setSize(size) {
        setPagination({ ...pagination, size });
      },
      getData() {
        return data.list;
      },
      setData(data) {
        console.log("setData: ", data);
        setData(data);
      },
      getRow(index) {
        return data.list[index];
      },
      getTotal() {
        return data.total;
      },
      getSelections() {
        return selections;
      },
      setSelections(selections) {
        const itemByPrimary = new Map<string, DataItem>();
        selections.forEach((item) => {
          const primary = item[primaryKey];
          if (!itemByPrimary.has(primary)) {
            itemByPrimary.set(primary, item);
          }
        });
        setSelections(Array.from(itemByPrimary.values()));
      },
      clearSelections() {
        setSelections([]);
      },
      refresh() {
        refresh();
      },
    };
  }, [
    pagination,
    setPagination,
    data,
    setData,
    refresh,
    selections,
    setSelections,
    primaryKey,
  ]);

  const renderColumns = useMemo(() => {
    const dataColumns = columns
      ?.filter((col) => col.visible === undefined || col.visible === true)
      .map((col) => createAntTableColumn(col, {}, tableInstance));
    if (showRowNumber) {
      const rowNoColumn: ColumnType<DataItem> = {
        key: "rowNo",
        title: "#",
        width: 48,
        render: (_1, _2, index) => index + 1,
      };
      return [rowNoColumn, ...(dataColumns ?? [])];
    }
    return dataColumns;
  }, [columns, showRowNumber, tableInstance]);

  return (
    <TableInstanceProvier tableInstance={tableInstance}>
      <div className={styles["cf-table-root"]}>
        {toolbar ? (
          <div className={styles["cf-table-toolbar"]}>
            {toolbar(tableInstance)}
          </div>
        ) : null}
        <div className={styles["cf-table-body"]}>
          <AntTable
            rowKey={primaryKey}
            loading={{ spinning: listLoading, tip: loadingTip }}
            columns={renderColumns}
            dataSource={data.list}
            pagination={false}
            expandable={expandable}
            rowSelection={
              rowSelectionConf
                ? {
                    type:
                      rowSelectionConf === "multiple" ? "checkbox" : "radio",
                    columnWidth: 48,
                    fixed: "left",
                    selections: selections.map((item) => {
                      return item[primaryKey];
                    }),
                    onChange: (_selectedKeys, selectedRows) => {
                      setSelections(selectedRows);
                    },
                  }
                : undefined
            }
          />
        </div>
        {paginationConf?.enabled ? (
          <div className={styles["cf-table-pagination"]}>
            <Pagination
              showSizeChanger
              total={data.total}
              current={pagination.index!}
              pageSize={pagination.size ?? 10}
              pageSizeOptions={paginationConf?.options ?? [5, 10, 20, 30, 50]}
              showTotal={(total) => (
                <Typography.Text>合计: {total}条</Typography.Text>
              )}
              onChange={(page, size) => {
                setPagination({ index: page, size });
              }}
            />
          </div>
        ) : null}
      </div>
    </TableInstanceProvier>
  );
};

export default Table;
