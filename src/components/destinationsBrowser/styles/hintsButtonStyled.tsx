import styled from "styled-components";
import { Button } from "../../../ui/Button";


export const HintsButtonStyled = styled(Button)`

   cursor: pointer;
   text-align: left;

   span{
      display: block;
   } 

   span:nth-child(2){
      color: #70757a;
    }
`;