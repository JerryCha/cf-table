import { useContext } from "react";
import { EditingAtomContext } from "../contexts/EditingAtomContext";

export const useEditingAtom = () => useContext(EditingAtomContext);
