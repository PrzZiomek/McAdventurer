//import { Menu } from "@material-ui/icons"
import { useState, FC, useRef } from "react"
import { useDetectOutsideClick } from "../../../../customHooks/useDetectOutsideClick"
import { MapThemesMenu } from "../../../mapThemesMenu/MapThemesMenu"
import { Menu } from "./components/menu/Menu"
import { MenuButtonStyled } from "./styles/MenuButtonStyled"
import { MenuPanelStyled } from "./styles/MenuPanelStyled"


export const MenuPanel: FC = () => {

   const [showPanel, setShowPanel] = useState(false); 
   const menuRef = useRef<HTMLDivElement>(null);
   useDetectOutsideClick(menuRef, () => setShowPanel(false));

   const handleButtonClick = () => {
       setShowPanel(!showPanel);
   }

   return (
      <MenuPanelStyled id="right_panel_wrapper">
         <MenuButtonStyled showPanel={showPanel} handleClick={handleButtonClick}>menu</MenuButtonStyled>
         <Menu showPanel={showPanel} ref={menuRef}>
            <MapThemesMenu />
         </Menu>
      </MenuPanelStyled>
   )
}
