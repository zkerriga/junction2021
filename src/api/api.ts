import axios from "axios";

export const getUpdatedGoal = (newGoal: number) => {
	return axios.get('./mock/goal.json').then(res => res.data);
}