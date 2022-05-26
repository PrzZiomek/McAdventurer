import { useState, FC } from "react";
import { MenuStyled } from "./styles/MenuStyled";


export const Menu: FC = (props) => {

   return (
      <MenuStyled id="menu">
            {props.children}
      </MenuStyled>
   )
}