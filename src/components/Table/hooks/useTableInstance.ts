import { useContext } from "react";
import { TableInstanceProvderContext } from "../contexts/provider";

export const useTableInstance = () => useContext(TableInstanceProvderContext);
