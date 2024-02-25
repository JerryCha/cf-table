/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "jotai";
import { IPagination, IRowSelection, ITableData } from "../types/store";

/**
 * State:
 *  pagination
 *  data
 *  seletions
 */

export const dataAtom = atom<ITableData>({ total: 0, list: [] });

export const dataListAtom = atom((get) => get(dataAtom).list);
export const dataTotalAtom = atom((get) => get(dataAtom).total);

export const paginationAtom = atom<IPagination>({ index: null, size: null });

export const selectionAtom = atom<IRowSelection[]>([]);

export const queryAtom = atom<Record<string, any>>({});
