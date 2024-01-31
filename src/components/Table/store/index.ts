import { atom } from "jotai";

/**
 * State:
 *  pagination
 *  data
 *  seletions
 */
export const data = atom({
  total: 0,
  list: [],
});
