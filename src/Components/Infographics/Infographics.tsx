import React from 'react';
import styled, { css } from "styled-components";
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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

const StyledSelectorContainer = styled.div`
	display: flex;
  	align-items: center;
  	justify-content: space-between;
`

const StyledSubTitle = styled.h4`
    margin-top: 0;
	font-weight: 400;
  	color: #4F4B4B;
`

interface Infographics {
    value: number,
}

const Infographics = ({ value }: Infographics) => {
    return (
        <StyledContainer>
            <StyledTitle>INFOGRAPHICS</StyledTitle>
            <StyledSubTitle>Average of water and energy</StyledSubTitle>
            <StyledSelectorContainer >
                <CircularProgressbar
                    value={value}
                    text={`${value}l/min`}
                    circleRatio={0.75}
                    styles={buildStyles({
                        rotation: 1 / 2 + 1 / 8,
                        strokeLinecap: "round",
                        trailColor: "#9BD1E550",
                        pathColor: "#6A8EAE90",
                    })}
                />
                <CircularProgressbar
                    value={value}
                    text={`${value}kWh`}
                    circleRatio={0.75}
                    styles={buildStyles({
                        rotation: 1 / 2 + 1 / 8,
                        strokeLinecap: "round",
                        trailColor: "#57A77350",
                        pathColor: "#15714590",
                    })}
                />
            </StyledSelectorContainer>
        </StyledContainer>
    );
};

export default Infographics;