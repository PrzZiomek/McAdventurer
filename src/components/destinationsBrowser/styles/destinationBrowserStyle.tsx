import styled from "styled-components";
import { Button } from "../../../ui/Button";
import { Div } from "../../../ui/Div";
import { Input } from "../../../ui/Input";
import { Span } from "../../../ui/Span";
//import "../../styles/variables/panel.scss";

export const DestinationsBrowserStyles = styled(Div)`
  display:flex;
  flex-wrap: wrap;
  width: 90%;
  height: 45px;
  height: auto;
  position: absolute;
  left: 4.8%;
  top: 16px;
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

export const BrowserInputStyled = styled(Input)`
    width: 70%;
    height: 56%;
    height: 24px;
    margin-left: 11px;
    margin-top: 3%;
    margin-bottom: 6px;
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

export const InputButtonStyled = styled(Button)`
      position: absolute;
      right: 10px;
      height: 40px;
      cursor: pointer;
      color: #6F6F49;
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
