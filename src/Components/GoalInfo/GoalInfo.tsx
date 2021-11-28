import React from 'react';
import styled, {css} from "styled-components";

const StyledContainer = styled.div`
  	width: 100%;
  	border: 1px solid #E5E5E5;
  	padding: 16px;
  	border-radius: 16px;
  	margin-bottom: 16px;
`
const StyledInfoContainer = styled.div`
	display: flex;
  	align-items: center;
  	justify-content: space-between;
  	margin-bottom: 16px;
`

const StyledRange = styled.div<{ consumptionPercent: number, date: number }>`
	width: 100%;
  	height: 16px;
  	background-color: #F2F2F7;
  	border-radius: 8px;
  	position: relative;
  
  &::before {
	content: '';
	height: 16px;
    border-radius: 8px;
	width: ${({consumptionPercent}) => 100 * consumptionPercent}%;
	max-width: 100%;
	display: block;
    background: ${({consumptionPercent, date}) => 100 * consumptionPercent > (date / 30) * 100 ? '#F98181' : 'rgba(110, 194, 140, 0.6)'};
  }
  
  &::after {
	content: '';
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: ${({date}) => (date / 30) * 100}%;
    height: 24px;
	width: 2px;
	background-color: #000;
	border: 1px dashed black;
  }
`

interface GoalInfoProps {
	goal: number;
	currentConsumption: number;
}

const GoalInfo = ({ goal, currentConsumption }: GoalInfoProps) => {
	return (
		<StyledContainer>
			<StyledInfoContainer>
				<span>Goal</span>
				<span>{`${goal} l/month`}</span>
			</StyledInfoContainer>
			<StyledRange date={new Date(Date.now()).getDate()} consumptionPercent={(currentConsumption / goal)}/>
		</StyledContainer>
	);
};

export default GoalInfo;