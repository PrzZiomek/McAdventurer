import styled from "styled-components";
import { Button } from "../../../ui/Button";
import { Div } from "../../../ui/Div";
import { Input } from "../../../ui/Input";

export const DestinationsBrowserStyled = styled(Div)`
  position: absolute;
  top: 16px;
  display:flex;
  flex-wrap: wrap;
  align-items: center;
  width: 90vw;
  min-height: 45px;
  z-index: 1;
  margin-left: calc(10vw / 2);
  border-radius: 7px;
  background: white;
  box-shadow: inset 0 0 8px #3e3e28;
  border: none;

//  border: ${(props) => props.changeBorder === true ? "none" : "1px solid #3e3e28"};
//  box-shadow: ${(props) => props.changeBorder === true ? "inset 0 0 8px #3e3e28" : "none"};
 
  @media (min-width: 768px){
    width: 400px;
    margin-left: 18px;
  }
`;

export const BrowserInputStyled = styled(Input)`
    width: 70%;
    margin-left: 11px;
    border-radius: 7px;
    font-size: 1rem;
    color:#3e3e28;
    height: 30px;
    margin-top: 14px;
    margin-bottom: 9px;
    border: none;     

    //  Tablet: >= 768 x 1024 <=
    @media (min-width: 768px){
      margin-left: 15px;
    }
`;


export const InputButtonStyled = styled(Button)`
      position: absolute;
      top: 5px;
      right: 14px;
      height: 45px;
      cursor: pointer;
      color: #6F6F49;
      text-transform: uppercase;
      padding-left: 8px;
      font-size: 1rem;
      border: none;
      background-color: transparent;
      transition: 0.2s;
      letter-spacing: 1px;

      &:hover{
        color: #C7C7A9;
    }

     //  Tablet: >= 768 x 1024 <=
     @media (min-width: 768px){
        right: 14px;
        font-size: 1.2rem;
        top: 5px;
     }
`;
