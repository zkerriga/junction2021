import React from 'react';
import {ActionType} from "../../store/reducer";
import GoalInfo from "../GoalInfo/GoalInfo";
import styled from "styled-components";
import Canvas from "../Canvas/Canvas";

const Container = styled.div`
	padding: 16px;
`

interface AppProps {
	dispatch:  React.Dispatch<ActionType>
}

const App = ({ dispatch }: AppProps) => {

	return (
		<Container>
			<h1>Junction 21</h1>
			<GoalInfo goal={100} currentConsumption={80}/>
			<Canvas />
		</Container>
	);
};

export default App;