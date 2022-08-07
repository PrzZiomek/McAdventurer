import React, { useState, FC } from "react";
import { SettingsMenuStyled } from "./styles/SettingsMenuStyled";

interface SettingsMenuProps {
   showPanel: boolean;
}

 const SettingsMenu: React.ForwardRefExoticComponent<SettingsMenuProps> = React.forwardRef((props, ref) => {

   return (
      <SettingsMenuStyled
         showPanel={props.showPanel} 
         actualRef={ref} 
         id="settings_SettingsMenu" 
         ariaLabel="map settings SettingsMenu"
      >
            {props.children}
      </SettingsMenuStyled>
   )
});

export default SettingsMenu;