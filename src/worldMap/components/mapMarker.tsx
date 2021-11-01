import styled from "styled-components";
import { Div } from "../../ui/Div";


export const Marker = styled(Div)`
  
    position: absolute;
    border-radius: 50%;
    background-color:white; 
    width: 18px;
    height: 18px;
  
  &::after {
    position: absolute;
    content: '';
    width: 0px;
    height: 0px;
    bottom: -30px;
    left: 0px;
    border: 9px solid transparent;
    border-top: 27px solid #fff;
  }
` 
