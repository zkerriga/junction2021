import React, {useContext} from 'react';
import {ActionType} from "../../store/reducer";
import GoalInfo from "../GoalInfo/GoalInfo";
import styled from "styled-components";
import Canvas from "../Canvas/Canvas";
import GoalSelector from "../GoalSelector/GoalSelector";
import {StoreContext} from "../../context/storeContext";
import {getUpdatedGoal} from "../../api/api";
import {setGoal} from "../../store/actions/goal/action-creator";

const Container = styled.div`
	padding: 16px;
`

interface AppProps {
	dispatch:  React.Dispatch<ActionType>
}

const App = ({ dispatch }: AppProps) => {
	const state = useContext(StoreContext);

	// const changeGoalHandler = (newGoal: number) => {
	// 	getUpdatedGoal(newGoal).then((data) => {
	// 		dispatch(setGoal({...data}));
	// 	})
	// }

	return (
		<Container>
			<h1>Junction 21</h1>
			{/*<GoalInfo goal={100} currentConsumption={99}/>*/}
			{/*<Canvas />*/}
			<GoalSelector

				goal={0}/>
		</Container>
	);
};

export default App;