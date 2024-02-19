/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "jotai";

interface RowEditingState {
  state: unknown;
  form: unknown;
}

export const createEditingAtom = () => atom<Record<number, boolean>>({});
