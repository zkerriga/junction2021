import {GoalActionTypes} from "./types";
import {Goal} from "../../../types/stateTypes";

export const setGoal = (payload: Goal) => ({type: GoalActionTypes.SET_GOAL, payload});