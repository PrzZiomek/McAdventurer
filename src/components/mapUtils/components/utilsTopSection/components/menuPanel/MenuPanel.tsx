import { useState, FC, useRef } from "react"
import { Menu as MenuIcon} from "@material-ui/icons"
import { Tooltip, IconButton } from '@mui/material';

import { useDetectOutsideClick } from "../../../../../../customHooks/useDetectOutsideClick"
import { Button } from "../../../../../../ui/Button"
import { Menu } from "./components/menu/Menu"
import { MenuButtonStyled } from "./styles/MenuButtonStyled"
import { MenuPanelStyled } from "./styles/MenuPanelStyled"
import { MapThemesMenu } from "../../../../../mapThemesMenu/MapThemesMenu";

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
            <Tooltip title="Menu">
               <IconButton 
                  onClick={handleMenuClick}
               >
                  <MenuIcon />
               </IconButton>
            </Tooltip> 
         )
      }

      return element;
  }
   
  return (
      <MenuPanelStyled id="right_panel_wrapper">
         {menuButton()}
         <Menu showPanel={showPanel} ref={menuRef}>
            <div className="menuList" id="menu_list">
               <menu>
                  <li><Button onClick={handleThemesClick}>Themes</Button></li>
               </menu>
            </div>
            <MapThemesMenu setShowThemes={setShowThemes} toggleState={showThemes} />
         </Menu>
      </MenuPanelStyled>
   )
}
