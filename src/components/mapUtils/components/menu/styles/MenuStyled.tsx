import styled from "styled-components";

import { panelColor } from "../../../../../styles/themes/accessors";
import { Button } from "../../../../../ui/Button"; 
import { Div } from "../../../../../ui/Div";


export const MenuStyled = styled(Div)`
   position: absolute;
   top: 10px;
   right: 10px;
   width: 75px;
   z-index: 3;
   background-color: ${panelColor("background")}; 
`; 

export const MenuButtonStyled = styled(Button)`
   text-transform: uppercase;
   padding: 0 20px;
   background-color: ${panelColor("background")}; 
   transition: 0.5s;
   box-shadow: inset 0 0 8px ${panelColor("text")}; 
   border-radius: 20px; 
   height: 45px;
   cursor: pointer;
   color: #6F6F49;
   padding-left: 8px;
   font-size: 1rem;
   transition: 0.3s;
   letter-spacing: 1px;
   border: none;

   &:hover{
        color: #C7C7A9;
    }
`