import React, { useState, FC } from "react";
import { MenuStyled } from "./styles/MenuStyled";

interface MenuProps {
   showPanel: boolean;
}

export const Menu: React.ForwardRefExoticComponent<MenuProps> = React.forwardRef((props, ref) => {

   return (
      <MenuStyled showPanel={props.showPanel} actualRef={ref} id="menu">
            {props.children}
      </MenuStyled>
   )
})