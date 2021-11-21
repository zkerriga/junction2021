import React, {useEffect, useState} from 'react';
import App from "../App/App";
import {StoreContext} from "../../context/storeContext";
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
		goal: 200,
		status: 0,
		consumption: {
			liters: 0,
			kWh: 0,
		},
	})

	useEffect(() => {
		getUpdatedGoal(state.goal).then(data => {
			setState(prevState => ({
				...prevState,
				status: data.status,
				consumption: {
					...data.consumption
				}
			}))
		})
	}, [])

	return (
		<StoreContext.Provider value={state}>
			<App setState={setState}/>
		</StoreContext.Provider>
	);
};

export default AppData;