import React, { useState, FC, useRef, Suspense } from "react"
import  Menu from "@material-ui/icons/Menu"

import { useDetectOutsideClick } from "../../../../../../customHooks/useDetectOutsideClick"
import { Button } from "../../../../../../ui/Button"
import { MenuButtonStyled } from "./styles/MenuButtonStyled"
import { MenuPanelStyled } from "./styles/MenuPanelStyled"
import { MapThemesMenu } from "../../../../../mapThemesMenu/MapThemesMenu";
import { IconButtonWithTooltip } from "../../../../../../ui/iconButton/IconButtonWithTooltip";
import { List } from "../../../../../../ui/List";


const SettingsMenu = React.lazy(() => import("./components/menu/SettingsMenu"));

interface MenuPanelProps {
   device: "mobile" | "desktop";
}


export const MenuPanel: FC<MenuPanelProps> = (props) => {

   const [showPanel, setShowPanel] = useState(false); 
   const [showThemes, setShowThemes] = useState(false);
   const menuRef = useRef<HTMLDivElement>(null);
   useDetectOutsideClick(menuRef, () => setShowPanel(false));

   const settingsMenuId: string = "settings_menu";
   const menuButtonId: string = "menu_button";
   const menuListButtonId: string = "menu_list_button";
   const themesBarId: string = "themes_Bar";

   const handleMenuClick = () => {
       setShowPanel(true);
   }

   const handleThemesClick = () => {
      setShowThemes(!showThemes);
  }

  const menuButton = () => {
      let element: JSX.Element = 
         <MenuButtonStyled
            showPanel={showPanel} 
            onClick={handleMenuClick}
            ariaControls={settingsMenuId}
            id={menuButtonId}
            ariaExpanded={showPanel}
         >
            menu
         </MenuButtonStyled>;

      if(props.device === "mobile"){
         element = (
            <IconButtonWithTooltip
               icon= {<Menu />} 
               onClick={handleMenuClick}
               title="Menu"
               ariaControls={settingsMenuId}
               id={menuButtonId}
               ariaExpanded={showPanel}
            /> )
      }

      return element;
  }

  const returnMenuListItem = () => (
      <Button
         onClick={handleThemesClick}
         ariaControls={themesBarId}
         id={menuListButtonId}
         ariaExpanded={showThemes}
      >
      themes
      </Button>
   );

   
  return (
      <MenuPanelStyled id="right_panel_wrapper">
         {menuButton()}
         <Suspense fallback={null}>
            <SettingsMenu
                showPanel={showPanel} 
                id={settingsMenuId}
                ariaLabelledBy={menuButtonId}
                ref={menuRef}
            >
               <div className="menuList" id="menu_list">
                  <List
                     listType="menu"
                     items={[0]}
                     renderChildren={returnMenuListItem}
                   />
               </div>
               <MapThemesMenu
                   setShowThemes={setShowThemes} 
                   toggleState={showThemes}
                   ariaLabelledBy={menuListButtonId}
                   id={themesBarId}
               />
            </SettingsMenu>
         </Suspense>
         
      </MenuPanelStyled>
   )
};

