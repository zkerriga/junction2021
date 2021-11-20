import { createContext } from "react";
import {State} from "../types/stateTypes";

export const StoreContext = createContext(undefined as State | undefined);