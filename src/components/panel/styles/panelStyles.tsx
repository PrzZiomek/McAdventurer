import styled from "styled-components";
import { callbackify } from "util";
import { panelColor } from "../../../styles/themes/accessors";
import { Div } from "../../../ui/Div";


export const PanelStyled = styled(Div)`
    position: absolute;
    width: 100vw;     // ${(props) => props.showPanel === true ? "100%" : 0};    
  //  min-width: 600px;
    min-height: 300px;
    height: 30vh;
   // min-height: ${(props) => props.showPanel === true ? "400px" : 0};
    left: 0;
    bottom: ${(props) => props.showPanel === false ? "-30vh" : 0 };
    z-index: 1;
    color:  ${panelColor("text")};
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    background-color: ${panelColor("background")}; 
    transition: 0.5s;
    box-shadow: 3px 0px 10px ${panelColor("text")}; 
    color: #3e3e28;
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
        width: 350px;
    }
    
   // High-res laptop or desktop: 1920 x 1080
`;



