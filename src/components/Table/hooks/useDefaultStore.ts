import { useMemo } from "react";
import { IPagination, IRowSelection, ITableData } from "../types/store";
import {
  createDataAtom,
  createPaginationAtom,
  createSelectionAtom,
} from "../store";
import { useAtom } from "jotai";

export const useDefaultStore = (initState: {
  data: ITableData;
  pagination: IPagination;
  rowSelection: IRowSelection[];
}) => {
  const paginationAtom = useMemo(() => {
    return createPaginationAtom(initState.pagination);
  }, []);

  const selectionAtom = useMemo(() => {
    return createSelectionAtom(initState.rowSelection);
  }, []);

  const dataAtom = useMemo(() => {
    return createDataAtom(initState.data);
  }, []);

  const [pagination, setPagination] = useAtom(paginationAtom);
  const [data, setData] = useAtom(dataAtom);
  const [selections, setSelections] = useAtom(selectionAtom);

  return {
    pagination,
    setPagination,
    data,
    setData,
    selections,
    setSelections,
  };
};
