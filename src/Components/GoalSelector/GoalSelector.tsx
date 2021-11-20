import React, {useContext} from 'react';
import styled from "styled-components";
import {StoreContext} from "../../context/storeContext";

const StyledContainer = styled.div`
  width: 100%;
  border: 1px solid #E5E5E5;
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 16px;
`

const StyledTitle = styled.h3`
	margin-top: 0;
  	font-weight: 500;
  	color: #4F4B4B;
`

const StyledSubTitle = styled.h4`
	font-weight: 400;
  	color: #4F4B4B;
`

const StyledSelectorContainer = styled.div`
	display: flex;
  	align-items: center;
  	justify-content: center;
`

const StyledSelectorHero = styled.div`
  	display: flex;
  	flex-direction: column;
  	align-items: center;
  	justify-content: center;
	width: 120px;
  	height: 120px;
  	border-radius: 50%;
  	background-color: #fff;
  	position: relative;
  	margin: 0 40px;
  
  &::before {
    z-index: -1;
	content: '';
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: calc(100% + 10px);
	height: calc(100% + 10px);
	border-radius: 50%;
	background: linear-gradient(180deg, #5BC3CA, #E5E5E5 50%);
  }
`

const StyledAmount = styled.div`
  color: #4F4B4B;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
`

const StyledArrow = styled.div<{ direction: 'left' | 'right'}>`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  cursor: pointer;
  border-color: #4F4B4B;

  transform: rotate(${({direction}) => direction === 'left' ? '-45deg' : '135deg'});
`

interface GoalSelectorProps {
	goal: number;
	updateGoal: (newGoal: number) => void
}

const GoalSelector = ({goal, updateGoal}: GoalSelectorProps) => {
	// const { goal: goalNumber } = useContext(StoreContext)
	// const handler = () => {
	// 	getUpdatedGoal()
	// }

	return (
		<StyledContainer>
			<StyledTitle>BUILD NEW GOAL</StyledTitle>
			<StyledSubTitle>Set a new goal for greater results</StyledSubTitle>
			<StyledSelectorContainer>
				<StyledArrow direction="right" onClick={() => updateGoal(-25)}/>
				<StyledSelectorHero>
					<StyledAmount>{goal}</StyledAmount>
					<StyledAmount>l/month</StyledAmount>
				</StyledSelectorHero>
				<StyledArrow direction="left" onClick={() => updateGoal(25)}/>
			</StyledSelectorContainer>
		</StyledContainer>
	);
};

export default GoalSelector;