import styled from "styled-components";

import { Div } from "../../../../../ui/Div";
import { panelColor } from "../../../../../styles/themes/accessors";


export const DetailsPanelStyled = styled(Div)`
    position: absolute;
    width: 100vw;   
    min-height: 300px;
    left: 18px;
    bottom: ${(props) => props.showPanel === false ? "-300px" : 0 };
    z-index: 1;
    color:  ${panelColor("text")};
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    background-color: ${panelColor("background")}; 
    transition: 0.5s;
    box-shadow: inset 0 0 8px ${panelColor("text")}; 
    background-color: #F7F7F3; 

    .toggleBar{
       // display: ${(props) => props.showPanel === true ? "block" : "none"};
    }

 //  Tablet: >= 768 x 1024 <=
    @media (min-width: 768px){
        width: 400px;
        width: ${(props) => props.showPanel === true ? "50vw" : 0};   
    }

    @media (min-width: 1024px){
        width: 400px;
    }
    
`;



