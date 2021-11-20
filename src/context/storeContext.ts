import { createContext } from "react";
import {State} from "../types/stateTypes";

const initialState: State = {
	time: {
		hours: 0,
		minutes: 0,
		seconds: 0
	},
	rating: {
		totalUsers: 0,
		place: 0,
	},
	goal: 100,
	status: 0,
	consumption: {
		liters: 0,
		kWh: 0,
	},
}

export const StoreContext = createContext(initialState);