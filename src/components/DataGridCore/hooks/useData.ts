import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { dataAtom, dataListAtom, dataTotalAtom } from "../store";

export const useData = () => {
  return useAtom(dataAtom);
};

export const useDataValue = () => {
  return useAtomValue(dataAtom);
};

export const useSetData = () => {
  return useSetAtom(dataAtom);
};

export const useDataList = () => {
  return useAtomValue(dataListAtom);
};

export const useDataTotal = () => {
  return useAtomValue(dataTotalAtom);
};
