import React from 'react';
import styled, {css} from "styled-components";


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
    margin-top: 0;
    margin-bottom: 0;
	font-weight: 400;
  	color: #4F4B4B;
`

interface RatingInfo {
    total: number;
    place: number;
}

const Rating = ({total, place}: RatingInfo) => {
    return (
        <StyledContainer>
            <StyledTitle>RATING</StyledTitle>
            <StyledSubTitle>Your results are higher that {Math.round((place / total * 100))}% of users!</StyledSubTitle>
        </StyledContainer>
    );
}

export default Rating;
