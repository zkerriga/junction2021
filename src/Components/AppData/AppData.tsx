import React, {useEffect, useReducer} from 'react';
import {initialState, reducer} from '../../store/reducer'
import App from "../App/App";
import {StoreContext} from "../../context/storeContext";
import axios from "axios";
import {setGoal} from "../../store/actions/goal/action-creator";

const AppData = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		// axios.get('./mock/goal.json').then((res) => {
		// 	dispatch(setGoal(res.data));
		// })
	}, [])

	return (
		<StoreContext.Provider value={state}>
			<App dispatch={dispatch}/>
		</StoreContext.Provider>
	);
};

export default AppData;