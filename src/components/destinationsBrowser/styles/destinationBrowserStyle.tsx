import styled from "styled-components";
import { Button } from "../../../ui/Button";
import { Div } from "../../../ui/Div";
import { Input } from "../../../ui/Input";

export const DestinationsBrowserStyled = styled(Div)`
  position: absolute;
  top: 16px;
  width: 90vw;
  min-height: 45px;
  z-index: 1;
  margin-left: calc(10vw / 2);
  border-radius: 7px;
  background: white;
  box-shadow: inset 0 0 8px #3e3e28;
  border: none;

  form {
    display: flex;
    justify-content: space-between;
    width: 100%
  }

  form > div{
    width: 96%;
  }

  button{
    margin-right: 3px;
    margin-right: 55px;
  }

  button.MuiButtonBase-root.MuiIconButton-root:hover .MuiSvgIcon-root{
    color: #C7C7A9;
    cursor: pointer;
  }

  button.MuiButtonBase-root.MuiIconButton-root:hover{
    background-color: transparent;
  }

  .MuiSvgIcon-root{
    font-size: 1.69rem;
    color: #3e3e28;
  }
 
  @media (min-width: 768px){
    width: 400px;
    margin-left: 18px;

    button{
      padding-right: 8px;
      margin-right: 3px;
    }
  }
`;

export const BrowserInputStyled = styled(Input)`
    width: 70%;
    margin-left: 16px;
    border-radius: 7px;
    font-size: 1.15rem;
    color:#3e3e28;
    height: 34px;
    margin-top: 14px;
    margin-bottom: 9px;
    border: none;     

    ::placeholder {
      color: #aa9d98;
    }
    
    :-ms-input-placeholder {
      color: #aa9d98;
    }

    ::-ms-input-placeholder {
      color: #aa9d98;
    }

    @media (min-width: 768px){
      height: 32px;
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
      transition: 0.3s;
      letter-spacing: 1px;

      &:hover{
        color: #C7C7A9;
      }

     @media (min-width: 768px){
        right: 14px;
        font-size: 1.2rem;
        top: 5px;
     }
`;
