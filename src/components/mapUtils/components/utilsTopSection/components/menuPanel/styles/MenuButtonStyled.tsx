import styled from "styled-components";
import { panelColor } from "../../../../../../../styles/themes/accessors";
import { Button } from "../../../../../../../ui/Button";


export const MenuButtonStyled = styled(Button)`
   position: absolute;
   top: 6px;
  // z-index: ${(props) => props.showPanel === false ? "-385px" : "-10px" };
   right: 0;
   text-transform: uppercase;
   padding: 0 20px;
   background-color: white; 
   transition: 0.5s;
   box-shadow: 0 0 8px ${panelColor("text")}; 
   border-radius: 20px; 
   height: 45px;
   cursor: pointer;
   color: #6F6F49;
   font-size: 1rem;
   transition: 0.3s;
   letter-spacing: 1px;
   border: none;

   &:hover{
        color: #C7C7A9;
        box-shadow: inset 0 0 8px #3e3e28;
    }
`