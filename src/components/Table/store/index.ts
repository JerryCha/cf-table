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
