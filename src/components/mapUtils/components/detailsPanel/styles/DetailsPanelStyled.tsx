import styled from "styled-components";

import { panelColor } from "../../../../../styles/themes/accessors";
import { Section } from "../../../../../ui/Section";


export const DetailsPanelStyled = styled(Section)`
    position: absolute;
    width: 90vw;   
    max-height: ${(props) => props.showPanel === false ? "unset" : "80vh" };
    height: 400px;
    padding-right: 8px;
    left: calc(10vw / 2);
    bottom: ${(props) => props.showPanel === false ? "-400px" : 0 };
    z-index: 1;
    color:  ${panelColor("text")};
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    background-color: ${panelColor("background")}; 
    transition: 0.5s;
    box-shadow: inset 0 0 8px #000; 
    background-color: white; 

    @media (min-width: 768px){
        width: 400px;
        left: 18px;
    }
    
`;



