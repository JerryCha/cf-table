import { IRowFormRef } from "./row";

export enum RowState {
  Editing,
  Readonly,
}

interface RowEditingState {
  state: RowState;
  form: IRowFormRef | null;
}

export type IEditingStore = Record<number, RowEditingState>;
