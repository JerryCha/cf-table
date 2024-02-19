import { useContext } from "react";
import { TrContext } from "../contexts/TrContext";

export const useRowContext = () => useContext(TrContext);
