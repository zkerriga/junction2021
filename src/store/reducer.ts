import {State} from "../types/stateTypes";
import {goalActions, GoalActionTypes} from "./actions/goal/types";

export const initialState: State = {
	time: {
		hours: 0,
		minutes: 0,
		seconds: 0
	},
	rating: {
		totalUsers: 0,
		place: 0,
	},
	goal: {
		status: 0,
		consumption: {
			liters: 0,
			kWh: 0,
		},
	}
}

export type ActionType = goalActions;

export const reducer = (state: State, action: ActionType) => {
	switch (action.type) {
		case (GoalActionTypes.SET_GOAL):
			return {
				...state,
				goal: {
					...action.payload
				}
			}
		default:
			return state;
	}
}