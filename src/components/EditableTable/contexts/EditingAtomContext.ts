import { createContext } from "react";
import { createEditingAtom } from "../store";

interface EditingAtomContextType {
  editingAtom: ReturnType<typeof createEditingAtom>;
}

export const EditingAtomContext = createContext<EditingAtomContextType>({
  editingAtom: createEditingAtom(),
});

EditingAtomContext.displayName = "Editing Atom Provider";
