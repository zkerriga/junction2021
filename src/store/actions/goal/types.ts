import {Goal} from "../../../types/stateTypes";

export enum GoalActionTypes {
	SET_GOAL = 'SET_GOAL',
}

interface SetGoal {
	type: GoalActionTypes.SET_GOAL;
	payload: Goal;
}

export type goalActions = SetGoal;