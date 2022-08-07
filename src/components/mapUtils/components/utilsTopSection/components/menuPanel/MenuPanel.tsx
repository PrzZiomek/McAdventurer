import React, { useState, FC, useRef, Suspense } from "react"
import  Menu from "@material-ui/icons/Menu"

import { useDetectOutsideClick } from "../../../../../../customHooks/useDetectOutsideClick"
import { Button } from "../../../../../../ui/Button"
import { MenuButtonStyled } from "./styles/MenuButtonStyled"
import { MenuPanelStyled } from "./styles/MenuPanelStyled"
import { MapThemesMenu } from "../../../../../mapThemesMenu/MapThemesMenu";
import { IconButtonWithTooltip } from "../../../../../../ui/iconButton/IconButtonWithTooltip";


const SettingsMenu = React.lazy(() => import("./components/menu/SettingsMenu"));

interface MenuPanelProps {
   device: "mobile" | "desktop";
}

export const MenuPanel: FC<MenuPanelProps> = (props) => {

   const [showPanel, setShowPanel] = useState(false); 
   const menuRef = useRef<HTMLDivElement>(null);
   const [showThemes, setShowThemes] = useState(false);
   useDetectOutsideClick(menuRef, () => setShowPanel(false));

   const handleMenuClick = () => {
       setShowPanel(!showPanel);
   }

   const handleThemesClick = () => {
      setShowThemes(!showThemes);
  }

  const menuButton = () => {
      let element: JSX.Element = <MenuButtonStyled showPanel={showPanel} onClick={handleMenuClick}>menu</MenuButtonStyled>;

      if(props.device === "mobile"){
         element = (
            <IconButtonWithTooltip
               icon= {<Menu />} 
               onClick={handleMenuClick}
               title="Menu"
            /> )
      }

      return element;
  }
   
  return (
      <MenuPanelStyled id="right_panel_wrapper">
         {menuButton()}
         <Suspense fallback={<div>menu panel loading...</div>}>
            <SettingsMenu showPanel={showPanel} ref={menuRef}>
               <div className="menuList" id="menu_list">
                  <menu>
                     <li><Button onClick={handleThemesClick}>Themes</Button></li>
                  </menu>
               </div>
               <MapThemesMenu setShowThemes={setShowThemes} toggleState={showThemes} />
            </SettingsMenu>
         </Suspense>
         
      </MenuPanelStyled>
   )
}
