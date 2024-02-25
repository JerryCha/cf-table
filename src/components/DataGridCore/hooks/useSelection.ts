import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { selectionAtom } from "../store";

export const useSelection = () => {
  return useAtom(selectionAtom);
};

export const useSelectionValue = () => {
  return useAtomValue(selectionAtom);
};

export const useSetSelection = () => {
  return useSetAtom(selectionAtom);
};
