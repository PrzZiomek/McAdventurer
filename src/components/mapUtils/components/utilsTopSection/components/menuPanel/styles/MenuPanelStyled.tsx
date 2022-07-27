import styled from "styled-components";
import { Div } from "../../../../../../../ui/Div";


export const MenuPanelStyled = styled(Div)`
   position: absolute;
   top: 20px;
   right: 42px;
   z-index: 1;

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
      top: 10px;
      right: 10px;
  }
`