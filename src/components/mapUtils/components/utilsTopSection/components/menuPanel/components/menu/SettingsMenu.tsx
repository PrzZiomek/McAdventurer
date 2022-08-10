import React, { useState, FC, ForwardRefExoticComponent, forwardRef, useRef } from "react";
import { useDetectOutsideClick } from "../../../../../../../../customHooks/useDetectOutsideClick";
import { SettingsMenuStyled } from "./styles/SettingsMenuStyled";

interface SettingsMenuProps {
   showPanel: boolean;
   id: string;
   children: JSX.Element | JSX.Element[];
   ariaLabelledBy: string;
}


 const SettingsMenu: ForwardRefExoticComponent<SettingsMenuProps> = forwardRef((props, ref) => {

   return (
      <SettingsMenuStyled
         showPanel={props.showPanel} 
         actualRef={ref} 
         id={props.id} 
         ariaLabel="map settings menu"
         ariaLabelledBy={props.ariaLabelledBy}
      >
            {props.children}
      </SettingsMenuStyled>
   )
});

export default SettingsMenu;