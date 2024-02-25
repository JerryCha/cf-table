import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { queryAtom } from "../store";

export const useQuery = () => {
  return useAtom(queryAtom);
};

export const useQueryValue = () => {
  return useAtomValue(queryAtom);
};

export const useSetQuery = () => {
  return useSetAtom(queryAtom);
};
