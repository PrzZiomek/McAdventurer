import styled from "styled-components";
import { Button } from "../../../ui/Button";


export const HintsButtonStyled = styled(Button)`
   width: 100%;
   background-color: unset;
   border: none;
   color: #181717;
   cursor: pointer;
   text-align: left;

   span{
      display: block;
   } 

   span:nth-child(2){
      color: #70757a;
    }
    
   &:hover,
   &.highlight {
      background: #f2f2e9;
   }
    
`;