import styled from "styled-components";
import { panelColor } from "../../../styles/themes/accessors";
import { Div } from "../../../ui/Div";


export const PanelStyles = styled(Div)`
    position: absolute;
    width: 30vw;
    height: 100%; 
    min-height: 400px;
    min-width: 250px;
    z-index: 2;
    top: 0;
    left: ${(props) => props.showUpBar === false ? "-30vw" : 0};
    color:  ${panelColor("text")};
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: ${panelColor("background")}; 
    transition: 0.5s;
    box-shadow: 3px 0px 10px ${panelColor("text")}; 
`;
