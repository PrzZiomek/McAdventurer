import styled from "styled-components";

import { panelColor } from "../../../../../../../styles/themes/accessors";
import { Button } from "../../../../../../../ui/Button"; 
import { Div } from "../../../../../../../ui/Div";


export const MenuStyled = styled(Div)`
   position: absolute;
   top: -10px;
   right: ${(props) => props.showPanel === false ? "-385px" : "-10px" } ;
   width: 375px;
   height: 500px;
   z-index: 3;
   background-color: ${panelColor("background")}; 
   border-radius: 0 0 7px 7px;
   box-shadow:  0 0 8px #3e3e28;
   transition: 0.5s; 
   border: none;
`; 
