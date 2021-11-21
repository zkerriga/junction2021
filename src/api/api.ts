import axios from "axios";

export const getUpdatedGoal = (newGoal: number) => {
	return axios.get(`http://164.90.173.203:8080/user/stats/consumption?goalLiters=${newGoal}`).then(res => res.data);
}