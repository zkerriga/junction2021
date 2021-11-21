import React, {useContext, useState} from 'react';
import GoalInfo from "../GoalInfo/GoalInfo";
import styled from "styled-components";
import Canvas from "../Canvas/Canvas";
import GoalSelector from "../GoalSelector/GoalSelector";
import {StoreContext} from "../../context/storeContext";
import {getUpdatedGoal} from "../../api/api";
import {State} from "../../types/stateTypes";
import {colorRound, HEXtoHSL, HSL, HSLToHex} from "../../utils/color";
import {colors} from "../../render/getBasicRenderData";
import Tips from '../Tips/tips';
import Rating from '../Rating/Rating';
import Infographics from '../Infographics/Infographics';

const COLORS_RANGE = [
	{
		green: {
			best: '#A4D740',
			worst: '#c2b53d',
		}
	},
	{
		green2: {
			best: '#0ADD08',
			worst: '#B87008'
		}
	},
	{
		green3: {
			best: '#0ADD08',
			worst: '#C36F0A'
		}
	}
]

const Container = styled.div`
	padding: 16px;
`

interface AppProps {
	setState: React.Dispatch<React.SetStateAction<State>>
}

const App = ({ setState }: AppProps) => {
	const state = useContext(StoreContext);

	const changeGoalHandler = (newGoal: number) => {
		if (state.goal + newGoal > 0) {
			getUpdatedGoal(state.goal + newGoal).then(data => {
				setState(prevState => ({
					...prevState,
					goal: prevState.goal + newGoal,
					status: data.status,
					consumption: {
						...data.consumption
					}
				}))
			})

			COLORS_RANGE.forEach(el => {
				for (let key in el) {
					// @ts-ignore
					const bestHSL = HEXtoHSL(el[key].best);
					// @ts-ignore
					const worstHSL = HEXtoHSL(el[key].worst);
					const newHSLColor= {} as HSL;

					newHSLColor.s = colorRound(bestHSL?.s as number, worstHSL?.s as number, state.status);
					newHSLColor.h = colorRound(bestHSL?.h as number, worstHSL?.h as number, state.status);
					newHSLColor.l = colorRound(bestHSL?.l as number, worstHSL?.l as number, state.status);

					// @ts-ignore
					colors[key] = HSLToHex(newHSLColor.s, newHSLColor.h, newHSLColor.l);
				}
			})
		}
	}

	return (
		<Container>
			<GoalInfo goal={state.goal} currentConsumption={state.consumption.liters}/>
			<Canvas colors={colors} status={state.status}/>
			<GoalSelector
				updateGoal={changeGoalHandler}
				goal={state.goal}/>
			<Rating total={21} place={12}/>
			<Tips title="ADVICE OF THE DAY"/>
			<Infographics value={0.5}/>
		</Container>
	);
};

export default App;