import React, {useEffect, useState} from 'react';
import App from "../App/App";
import {State} from "../../types/stateTypes";
import {getUpdatedGoal} from "../../api/api";

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
		goal: 16000,
		status: 1,
		consumption: {
			liters: 0,
			kWh: 0,
		},
	})

	useEffect(() => {
		// @ts-ignore
		window.userstatus = state.status;
		getUpdatedGoal(state.goal).then(data => {
			setState(prevState => ({
				...prevState,
				status: data.status,
				consumption: {
					...data.consumption
				}
			}))
			// @ts-ignore
			window.userstatus = data.status
		});
	}, [])

	return (
		<App state={state} setState={setState}/>
	);
};

export default AppData;