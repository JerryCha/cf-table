import { createContext } from "react";

interface TrContextType {
  editing: boolean;
}

export const TrContext = createContext<TrContextType>({ editing: false });
