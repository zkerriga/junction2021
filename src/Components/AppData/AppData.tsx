import React, {useEffect, useReducer, useState} from 'react';
import App from "../App/App";
import {StoreContext} from "../../context/storeContext";
import axios from "axios";
import {State} from "../../types/stateTypes";

const AppData = () => {
	const [state, setState] = useState<State>({
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
	})

	useEffect(() => {
		// axios.get('./mock/goal.json').then((res) => {
		// 	dispatch(setGoal(res.data));
		// })
	}, [])

	console.log(state);

	return (
		<StoreContext.Provider value={state}>
			<App setState={setState}/>
		</StoreContext.Provider>
	);
};

export default AppData;