import React from 'react';
import styled, { css } from "styled-components";

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

interface Tips {
    title: string,
}

const Tips = ({ title}: Tips) => {
    var subtitles = ["Turn off the water while shaving", "Use your automatic dishwasher for full loads only", "Water your lawn only when it needs it", "Turn off the water while brushing your teeth"];
    var rand = subtitles[Math.floor(Math.random() * subtitles.length)];
    return (
        <StyledContainer>
            <StyledTitle>{title}</StyledTitle>
            <StyledSubTitle>{rand}</StyledSubTitle>
        </StyledContainer>
    );
};

export default Tips;