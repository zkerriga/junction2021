import React, {useContext} from 'react';
import GoalInfo from "../GoalInfo/GoalInfo";
import styled from "styled-components";
import Canvas from "../Canvas/Canvas";
import GoalSelector from "../GoalSelector/GoalSelector";
import {StoreContext} from "../../context/storeContext";
import {getUpdatedGoal} from "../../api/api";
import {State} from "../../types/stateTypes";

const Container = styled.div`
	padding: 16px;
`

interface AppProps {
	setState: React.Dispatch<React.SetStateAction<State>>
}

const App = ({ setState }: AppProps) => {
	const state = useContext(StoreContext);

	const changeGoalHandler = (newGoal: number) => {
		if (state.goal + newGoal >= 0) {
			getUpdatedGoal(newGoal).then(data => {
				setState(prevState => ({
					...prevState,
					goal: prevState.goal + newGoal,
					status: data.status,
					consumption: {
						...data.consumption
					}
				}))
			})
		}
	}


	return (
		<Container>
			<GoalInfo goal={state.goal} currentConsumption={state.consumption.liters}/>
			<Canvas />
			<GoalSelector
				updateGoal={changeGoalHandler}
				goal={state.goal}/>
		</Container>
	);
};

export default App;