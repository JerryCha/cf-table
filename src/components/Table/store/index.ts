import { atom } from "jotai";
import { IPagination, IRowSelection, ITableData } from "../types/store";

/**
 * State:
 *  pagination
 *  data
 *  seletions
 */

export const createDataAtom = (initData: ITableData) =>
  atom<ITableData>(initData);

export const createPaginationAtom = (initPagination: IPagination) =>
  atom<IPagination>(initPagination);

export const createSelectionAtom = (initSelections: IRowSelection[]) =>
  atom<IRowSelection[]>(initSelections);
