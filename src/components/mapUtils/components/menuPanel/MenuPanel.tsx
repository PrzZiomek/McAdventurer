//import { Menu } from "@material-ui/icons"
import { useState, FC, useRef } from "react"
import { useDetectOutsideClick } from "../../../../customHooks/useDetectOutsideClick"
import { Button } from "../../../../ui/Button"
import { ThemesToggleBar } from "../../../mapThemesMenu/components/ThemesToggleBar"
import { MapThemesMenu } from "../../../mapThemesMenu/MapThemesMenu"
import { Menu } from "./components/menu/Menu"
import { MenuButtonStyled } from "./styles/MenuButtonStyled"
import { MenuPanelStyled } from "./styles/MenuPanelStyled"


export const MenuPanel: FC = () => {

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

   return (
      <MenuPanelStyled id="right_panel_wrapper">
         <MenuButtonStyled showPanel={showPanel} handleClick={handleMenuClick}>menu</MenuButtonStyled>
         <Menu showPanel={showPanel} ref={menuRef}>
            <div className="menuList" id="menu_list">
               <menu>
                  <li><Button handleClick={handleThemesClick}>Themes</Button></li>
               </menu>
            </div>
            <MapThemesMenu setShowThemes={setShowThemes} toggleState={showThemes} />
         </Menu>
      </MenuPanelStyled>
   )
}
