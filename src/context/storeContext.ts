import { createContext } from "react";
import {State} from "../types/stateTypes";
import {initialState} from "../store/reducer";

export const StoreContext = createContext( initialState);