import { atom } from "jotai";
import { IEditingStore } from "../types/store";

// export const createEditingAtom = () => atom<Record<number, boolean>>({});
export const createEditingAtom = () => atom<IEditingStore>({});
