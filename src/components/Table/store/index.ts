import { atom } from "jotai";
import { IPagination, IRowSelection, ITableData } from "../types/store";

/**
 * State:
 *  pagination
 *  data
 *  seletions
 */

/**
 * static source connecting to indexdb
 * remote source directly communicates with remote site.
 */

export const dataAtom = atom<ITableData>({
  total: 0,
  list: [],
});

export const paginationAtom = atom<IPagination>({ index: null, size: null });

export const selectionAtom = atom<IRowSelection[]>([]);

export const createDataAtom = (initData: ITableData) =>
  atom<ITableData>(initData);

export const createPaginationAtom = (initPagination: IPagination) =>
  atom<IPagination>(initPagination);

export const createSelectionAtom = (initSelections: IRowSelection[]) =>
  atom<IRowSelection[]>(initSelections);
