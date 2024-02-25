import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { paginationAtom } from "../store";

export const usePaginationValue = () => {
  const pagination = useAtomValue(paginationAtom);
  return pagination;
};

export const usePagination = () => {
  return useAtom(paginationAtom);
};

export const useSetPagination = () => {
  return useSetAtom(paginationAtom);
};
