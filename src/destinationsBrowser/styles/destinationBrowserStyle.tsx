import styled from "styled-components";
import { Button } from "../../ui/Button";
import { Div } from "../../ui/Div";
import { Input } from "../../ui/Input";
import { Span } from "../../ui/Span";
import "../../styles/variables/panel.scss";

export const BrowserWrapper = styled.div`
  width: 95%;
  height: 45px;
  position: absolute;
  display:flex;
  left: 2.5%;
  top: 10px;
`;

export const BrowserInput = styled(Input)`
    width: 100%;
    height: 100%;
    border: 1px solid ;
    border-radius: 7px;
    font-size: 1.3rem; 
    color: ${(props) => props.visibleText ? "black" : "transparent"};
  `;

export const InputTextWrapper = styled(Div)`
    display: block;
    position: absolute;
    font-size: 1.3rem;
    transform: translateY(-50%);
    left: 2px;
    top: 50%; 

    span:nth-child(2){
      color: #aa9d98;
    }
`;

export const InputButton = styled(Button)`
      position: absolute;
      right: 10px;
      height: 100%;
      cursor: pointer; 
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 1.5rem;
      border: none;
      background-color: transparent;
      transition: 0.2s;

      &:hover{
         opacity: 0.5;
      }
`;

export const InputTextSpan = styled(Span)`
  text-transform: ${(props)=>props.textTransform ? props.textTransform  : "none"};
  display: ${(props)=>props.display ? props.display  : "inline"};
`