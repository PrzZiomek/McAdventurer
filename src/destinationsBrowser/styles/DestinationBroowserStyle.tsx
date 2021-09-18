import styled from "styled-components";
import { Button } from "../components/Button";
import { Div } from "../components/div";
import { Input } from "../components/Input";

export const BrowserWrapper = styled.div`
  width: 300px;
  height: 35px;
  position: absolute;
  display:flex;
  left: 20px;
  top: 20px;
`;

export const BrowserInput = styled(Input)`
    width: 100%;
    height: 100%;
    border: 1px solid black;
    font-size: 1rem; 
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
      right: 4%;
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