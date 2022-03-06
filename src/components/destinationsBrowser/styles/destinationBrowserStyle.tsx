import styled from "styled-components";
import { Button } from "../../../ui/Button";
import { Div } from "../../../ui/Div";
import { Input } from "../../../ui/Input";
import { Span } from "../../../ui/Span";
//import "../../styles/variables/panel.scss";

export const BrowserWrapper = styled(Div)`
  display:flex;
  width: 90%;
  height: 45px;
  position: absolute;
  left: 4.8%;
  top: 12px;
  border-radius: 7px;
  background: white;
  box-shadow: inset 0 0 8px #3e3e28;

  &::after{
    display: ${(props) => props.showHints ? "block" : "none"};
    content: "";
    position: absolute;
    left: 1%;
    top: 80%;
    width: 98%;
    height: 10px;
    background-color: white;
    border-radius: 70px 70px 0 0;
  }
`;

export const BrowserInput = styled(Input)`
    width: 90%;
    height: 56%;
    margin-left: 11px;
    margin-top: 3%;
    border-radius: 7px;
    font-size: 1rem; 
    color:#3e3e28;
    border: none;     
  `;

export const InputTextWrapper = styled(Div)`
    display: block;
    position: absolute;
    font-size: 1.3rem;
    transform: translateY(-50%);
    left: 10px;
    top: 50%; 

    span {
     white-space: nowrap;
    }

    span:nth-child(2){
      color: #aa9d98;
    }
`;

export const InputButton = styled(Button)`
      position: absolute;
      right: 10px;
      height: 100%;
      cursor: pointer; 
      color:#6F6F49;    //  #3E3E28;
      text-transform: uppercase;
      padding-left: 8px;
      font-size: 1rem;
      border: none;
      background-color: transparent;
      transition: 0.2s;

      &:hover,
      &:active{
        color: #C7C7A9;
    }
`;

export const InputTextSpan = styled(Span)`
  text-transform: ${(props)=> props.textTransform ? props.textTransform  : "none"};
  display: ${(props)=>props.display ? props.display  : "inline"};
`